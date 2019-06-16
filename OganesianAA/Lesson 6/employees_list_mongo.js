const path = require('path');
const express = require('express');
const app = express();//инициализация приложения
const consolidate = require('consolidate');
const chromeLauncher = require('chrome-launcher');
const mongo = require('./mongoConnect');
const mongoDB = new mongo();
const Employee = require('./mongoModelEmployees');
const User = require('./mongoModelUsers');
const cookie = require('cookie-parser');
const session = require('cookie-session');
const expSession = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

class EmployeesList {
    constructor(){
        this.init();
        this.start();
    }
    init(){
        // app.use(express.json());//bodyparser обработка пост запросов
        app.use(express.urlencoded({extended: true}));
        app.engine('hbs', consolidate.handlebars);//инициализация движка и шаблонов
        app.set('view engine', 'hbs');
        app.set('/views', path.resolve(__dirname, 'views'));
        app.use('/style', express.static(path.resolve(__dirname, 'style')));
        app.use('/script', express.static(path.resolve(__dirname, 'script')));
        app.use(cookie());
        app.use(session({keys: ['secret'], maxAge: 60 * 60 * 1000}));
        app.use(passport.initialize());
        app.use(passport.session());
    }
    passport(){
        passport.use(new LocalStrategy(async (username, password, done)=>{
            const user = await User.findOne({username});
            if(!user){
                return done(null, false, { message: 'Incorrect username.' });
            } else if (!user.validPassword(password)){
                return done(null, false, { message: 'Incorrect password.' });
            }   else{
                user.password = undefined;
                return done(null, user, { message: 'Successful login.' });
            }
        }));
        passport.serializeUser((user, done)=>{
            done(null, user._id);
        });

        passport.deserializeUser(async (id, done)=>{
            const user = await User.findById(id);
            done(null, user);
        });
        const authHandler = passport.authenticate('local', {
            successRedirect: '/user',
            failureRedirect: 'auth',
        });
    }
    login(){
        const loginHandler =(req, res, next)=>{
            passport.authenticate('local',{
                    successRedirect: '/employees',
                    failureRedirect: '/login',
                },(err, user, info, next)=>{
                    if (err) {
                        return next(err);
                    }
                    if (!user) {
                        return res.redirect('/login');
                    }
                    req.logIn(user, (err)=>{
                        if (err) {
                            return next(err);
                        } else{
                            return res.redirect('/employees');
                        }
                    });
                })(req, res, next);
        };
        app.post('/login', loginHandler);
    }
    getRoute(){
        app.get('/login', async (req, res)=>{//render login
            res.render('loginForm', {});
        });
        const mustBeAuthenticated = (req, res, next)=>{//check for grant access
            if(req.user){
                next();
            } else{
                res.redirect('/login');
            }
        };
        app.get('/*', mustBeAuthenticated);//scanning all urls to grant access

        app.get('/employees', async (req,res)=>{//render employees
            const data = await Employee.find();
            res.render('employeesListMongo',{data});
        });
        app.get('/employees/new', async (req,res)=>{//render new employee page
            res.render('newEmployee',{});
        });
        app.get('/logout', (req,res) =>{//logging out
            req.logout();
            res.redirect('/auth');
        });
        app.get('*', (req, res)=>{
            res.status(404).render('404',{});
        });
    }
    post(){
        const mustBeAuthenticated = (req, res, next)=>{//check for grant access
            if(req.user){
                next();
            } else{
                res.redirect('/login');
            }
        };
        app.post('/employees*', mustBeAuthenticated);//scanning all urls to grant access
        app.post('/employees*', async (req, res)=>{
            if (req.body){
                if (req.body.remove){// remove an employee
                    const data = req.body.remove;
                    const employee = await Employee.findByIdAndRemove(data.id);
                    res.redirect('/employees');
                } else if (req.body.goupdate){// open employee
                    const data = await Employee.findById(req.body.goupdate.id);
                    res.render('employeeMongo',{data});
                } else if (req.body.update){// update an employee
                    const data = req.body.update;
                    const employee = await Employee.findByIdAndUpdate(data.id, data);
                    res.redirect('/employees');
                } else if (req.body.login){
                    res.redirect(`/login/${JSON.stringify(req.body.login)}`);
                } else if (req.body.newEmployee){//add new employee
                    let data = new Employee(req.body.newEmployee);
                    data = await data.save();
                    res.redirect('/employees');
                } else if (req.body.logout){// logout
                    req.logout();
                    res.redirect('/login');
                }
            }
        });
        // app.put('/employees/:id', async (req, res)=>{
        //     if (req.body) {// update an employee
        //         const employee = await Employee.findByIdAndUpdate(req.params.id, req.body);
        //         res.redirect('/employees');
        //     }
        // });
        // app.patch('/employees/:id', async (req, res)=>{
        //     if (req.body){// update a specific value
        //         const employee = await Employee.findByIdAndUpdate(req.params.id, {$set: req.body});
        //         res.redirect('/employees');
        //     }
        // });
    }
    listen(){
        app.listen(8889, ()=>{
            console.log('server has been started');
        });
    }
    chromeLanuncher(){
        chromeLauncher.launch({
            startingUrl: 'http://localhost:8889/login'
        }).then(chrome => {
            console.log(`Chrome debugging port running on 8889`);
        });
    }
    start(){
        this.getRoute();
        this.passport();
        this.post();
        this.login();
        this.listen();
        this.chromeLanuncher();
    }
}

const newEmployeesList = new EmployeesList();
module.exports = EmployeesList;

//сделать шифрование паролей
//сделать вход через фейсбук