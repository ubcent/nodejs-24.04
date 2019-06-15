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

        app.get('/main', async (req,res)=>{//render main
            const data = await Employee.find();
            res.render('employeesListMongo',{data});
        });
        app.get('/newEmployee/', async (req,res)=>{//render new employee page
            res.render('newEmployee',{});
        });
        app.get('/newEmployee/:data', async (req,res)=>{//posting new employee
            let data = new Employee(JSON.parse(req.params.data));
            data = await data.save();
            res.redirect('/main');
        });
        app.get('/employee/:id', async (req,res)=>{//render specific employee page
            const data = await Employee.findById(req.params.id);
            res.render('employeeMongo',{data});
        });
        app.get(`/employeeupd/:data`, async(req, res)=>{//updating new employee
            const data = JSON.parse(req.params.data);
            const employee = await Employee.findByIdAndUpdate(data.id, data);
            res.redirect('/main');
        });
        app.get(`/employeerem/:id`, async(req, res)=>{//removing an employee
            const data = await Employee.findByIdAndRemove(req.params.id);
            res.redirect('/main');
        });
        app.get('/logout', (req,res) =>{//logging out
            req.logout();
            res.redirect('/auth');
        });
        app.get('*', (req, res)=>{
            res.status(404).render('404',{});
        });
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
            const user = User.findById(id);
            done(null, user);
        });
        const authHandler = passport.authenticate('local', {
            successRedirect: '/user',
            failureRedirect: 'auth',
        });
    }
    post(){
        app.post('/', (req, res)=>{
            if (req.body){
                if (req.body.newEmployee){
                    res.redirect(`/newEmployee/${JSON.stringify(req.body.newEmployee)}`);
                } else if (req.body.remove){
                    res.redirect(`/employeerem/${req.body.remove.id}`);
                } else if (req.body.goupdate){
                    res.redirect(`/employee/${req.body.goupdate.id}`);
                } else if (req.body.update){
                    res.redirect(`/employeeupd/${JSON.stringify(req.body.update)}`);
                } else if (req.body.login){
                    res.redirect(`/login/${JSON.stringify(req.body.login)}`);
                } else if (req.body.logout){
                    req.logout();
                    res.redirect('/login');
                }
            }
        });
    }
    login(){
        const loginHandler =(req, res, next)=>{
            passport.authenticate('local',
                {
                    successRedirect: '/main',
                    failureRedirect: '/login',
                }
                ,
                (err, user, info, next)=>{
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
                            return res.redirect('/main');
                        }
                    });
                })(req, res, next);
        };
        app.post('/login', loginHandler);
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

