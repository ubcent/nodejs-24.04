const path = require('path');
const express = require('express');
const app = express();
const consolidate = require('consolidate');
const chromeLauncher = require('chrome-launcher');
const MySql = require('./employees_model');
const mysqlDB = new MySql();

class EmployeesList {
    constructor(){
        this.init();
        this.start();
        this.list = {};
    }
    init(){ //make static
        app.use(express.json());
        app.use(express.urlencoded({extended: true}));
        app.engine('hbs', consolidate.handlebars);
        app.set('view engine', 'hbs');
        app.set('/views', path.resolve(__dirname, 'views'));
        app.use('/style', express.static(path.resolve(__dirname, 'style')));
        app.use('/script', express.static(path.resolve(__dirname, 'script')));
    }
    getRoute(){
        app.get('/main', async (req,res)=>{
            this.getAllEmployees()
                .then( data => {
                    res.render('employeesList',{data});
                })
                .catch(err=>console.log(err))
            ;
        });
        app.get('/newEmployee', async (req,res)=>{
            res.render('newEmployee',{});
        });
        app.get('/employee/:id', async (req,res)=>{
            this.getAnEmployee(req.params.id)
                .then(data=>{
                    res.render('employee',{data});
                })
                .catch(err=>console.log(err));
        });
        app.get('*', (req, res)=>{
            if(res.status === 404) {
                res.send('<h1 class="404">404 page not found</h1>')
            } else
                res.redirect('/main');
        });
    }
    post(){
        app.post('/', (req, res)=>{
            if (req.body){
                if (req.body.newEmployee){
                    this.addAnEmployee(req.body.newEmployee)
                        .then(()=>{
                            res.redirect('/main');
                        })
                        .catch(err=>console.log(err));
                } else if (req.body.remove){
                    this.removeAnEmployee(req.body.remove.id)
                        .then(()=>{
                            res.redirect('/main');
                        })
                        .catch(err=>console.log(err));
                } else if (req.body.goupdate){
                        res.redirect(`/employee/${req.body.goupdate.id}`);
                } else if (req.body.update){
                    this.updateAnEmployee(req.body.update)
                        .then(()=>{
                            res.redirect('/main');
                        })
                        .catch(err=>console.log(err));
                }
            }
        });
    }
    getAllEmployees(){
        return new Promise((resolve, reject)=>{
            const dataDB = mysqlDB.getAll();
            dataDB
                .then(data=>{
                    this.list = {...data.result};
                    resolve({...data.result});
                })
                .catch(err=>{
                    console.log(err);
                });
        })
    }
    getAnEmployee(id){
        return new Promise((resolve, reject)=>{
            const dataDB = mysqlDB.get(id);
            dataDB
                .then(data=>{
                    resolve({...data.result});
                })
                .catch(err=>{
                    console.log(err);
                });
        })
    }
    addAnEmployee(item){
        let {firstName, lastName, birthDate, hireDate, gender} = item;
        return new Promise((resolve, reject)=>{
            const dataDB = mysqlDB.add(firstName, lastName, birthDate, hireDate, gender);
            dataDB
                .then(data=>{
                    resolve({...data});
                })
                .catch(err=>{
                    console.log(err);
                });
        })
    }
    updateAnEmployee(data){
        let {id, firstName, lastName, birthDate, hireDate, gender} = data;
        return new Promise((resolve, reject)=>{
            const dataDB = mysqlDB.update(id, firstName, lastName, birthDate, hireDate, gender);
            dataDB
                .then(data=>{
                    resolve({...data.result});
                })
                .catch(err=>{
                    console.log(err);
                });
        })
    }
    removeAnEmployee(id){
        return new Promise((resolve, reject)=>{
            const dataDB = mysqlDB.remove(id);
            dataDB
                .then(data=>{
                    resolve({...data.result});
                })
                .catch(err=>{
                    console.log(err);
                });
        })
    }
    listen(){
        app.listen(8888, ()=>{
            console.log('server has been started');
        });
    }
    chromeLanuncher(){
        chromeLauncher.launch({
            startingUrl: 'http://localhost:8888/main'
        }).then(chrome => {
            console.log(`Chrome debugging port running on 8888`);
        });
    }
    start(){//make static
        this.getRoute();
        this.post();
        this.listen();
        this.chromeLanuncher();
    }
}

const newEmployeesList = new EmployeesList();
module.exports = EmployeesList;
