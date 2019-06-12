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
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


class EmployeesList {
    constructor(){
        this.init();
        this.start();
        this.list = {};
    }
    init(){ //make static
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
    getRoute(){
        app.get('/login', async (req, res)=>{
           res.render('loginForm', {});
        });

        app.get('/main', async (req,res)=>{
            const data = await Employee.find();
            res.render('employeesListMongo',{data});
        });
        app.get('/newEmployee/', async (req,res)=>{
            res.render('newEmployee',{});
        });
        app.get('/newEmployee/:data', async (req,res)=>{
            let data = new Employee(JSON.parse(req.params.data));
            data = await data.save();
            res.redirect('/main');
        });
        app.get('/employee/:id', async (req,res)=>{
            const data = await Employee.findById(req.params.id);
            res.render('employeeMongo',{data});
        });
        app.get(`/employeeupd/:data`, async(req, res)=>{
            const data = JSON.parse(req.params.data);
            const employee = await Employee.findByIdAndUpdate(data.id, data);
            res.redirect('/main');
        });
        app.get(`/employeerem/:id`, async(req, res)=>{
            const data = await Employee.findByIdAndRemove(req.params.id);
            res.redirect('/main');
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
                    res.redirect(`/newEmployee/${JSON.stringify(req.body.newEmployee)}`);
                } else if (req.body.remove){
                    res.redirect(`/employeerem/${req.body.remove.id}`);
                } else if (req.body.goupdate){
                    res.redirect(`/employee/${req.body.goupdate.id}`);
                } else if (req.body.update){
                    res.redirect(`/employeeupd/${JSON.stringify(req.body.update)}`);
                } else if (req.body.login){
                    res.redirect(`/login/${JSON.stringify(req.body.login)}`);
                }
            }
        });
        app.post('/login',(req, res, next)=>{
            passport.authenticate('local',
                (err, user, info)=>{
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.redirect('/login');
                }
                req.logIn(user, (err)=>{
                    if (err) {
                        return next(err);
                    }
                    return res.redirect('/main');
                });
            })(req, res, next);
        });
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
    start(){//make static
        this.getRoute();
        this.post();
        this.listen();
        this.chromeLanuncher();
    }
}

const newEmployeesList = new EmployeesList();
module.exports = EmployeesList;

