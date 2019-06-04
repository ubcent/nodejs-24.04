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
    }
    middleWare(){
        app.use((req, res, next)=>{
            console.log('middleWare next');
            next();
        })
    }
    getRoute(){
        app.get('/main', async (req,res)=>{
            this.getAllEmployees()
                .then( data => {
                    // console.log({employees:data});
                    console.log({data});
                    res.render('employeesList',{data});
                })
                .catch(err=>console.log(err))
            ;
        });
        // app.get('/news', (req,res)=>{
        //     res.render('news', this.news); // resolve from promise
        // });
        //ловим 404
        app.get('*', (req, res)=>{
            res.send('<h1 class="404">404 page not found</h1>');
        });
    }
    post(){
        app.post('/', (req, res)=>{
            console.log(req.body);
        });
    }
    listen(){
        app.listen(8888, ()=>{
            console.log('server has been started');
        });
    }
    chromeLanuncher(){
        chromeLauncher.launch({
            startingUrl: 'http://localhost:8890/main'
        }).then(chrome => {
            console.log(`Chrome debugging port running on 8890`);
        });
    }
    getAllEmployees(){
        return new Promise((resolve, reject)=>{
            const dataDB = mysqlDB.getAll();
            dataDB
                .then(data=>{
                    resolve({...data.result});
                    // resolve({...data.fields});
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
                    // resolve({...data.result});
                    // resolve({...data.fields});
                })
                .catch(err=>{
                    console.log(err);
                });
        })
    }
    addAnEmployee(birth_date, first_name, last_name, gender, hire_date){
        return new Promise((resolve, reject)=>{
            const dataDB = mysqlDB.add(birth_date, first_name, last_name, gender, hire_date);
            dataDB
                .then(data=>{
                    // resolve({...data.result});
                    // resolve({...data.fields});
                })
                .catch(err=>{
                    console.log(err);
                });
        })
    }
    updateAnEmployee(id, param, value){
        return new Promise((resolve, reject)=>{
            const dataDB = mysqlDB.update(id, param, value);
            dataDB
                .then(data=>{
                    // resolve({...data.result});
                    // resolve({...data.fields});
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
                    // resolve({...data.result});
                    // resolve({...data.fields});
                })
                .catch(err=>{
                    console.log(err);
                });
        })
    }
    start(){//make static
        this.getRoute();
        this.post();
        this.listen();
    }
}

const newEmployeesList = new EmployeesList();