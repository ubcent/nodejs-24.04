//declare all the modules
const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const server = http.Server(app);
const socketIO = require('socket.io');
const io = socketIO(server);
const consolidate = require('consolidate');
const chromeLauncher = require('chrome-launcher');
const url = require('url');
const mongo = require('./mongoConnect');
const mongoDB = new mongo();
const Employee = require('./model/EmployeesModel');
const User = require('./model/UsersModel');
const Note = require('./model/NoteModel');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

class EmployeesList {
    constructor(){
        this.init();//starting with initialization
        this.start();
        this.passport();
        this.login();
        this.checkAuthentication();
        this.requestHandler();
        this.socket();
        this.listen();
        this.chromeLanuncher();
        this.secret = 'secret';
        this.openLinks = [// links allowed to eny request
            'http://localhost:8889/login',
            'http://localhost:8889/employees',
            'http://localhost:8889/employee',
            'http://localhost:8889/404',
        ]
    }
    init(){// start module, defines all the all the usages
        app.use(express.json());
        app.use(express.urlencoded({extended: true}));
        app.engine('hbs', consolidate.handlebars);
        app.set('view engine', 'hbs');
        app.set('/views', path.resolve(__dirname, 'views'));
        app.use('/style', express.static(path.resolve(__dirname, 'style')));
        app.use('/script', express.static(path.resolve(__dirname, 'script')));
        app.use(cors());
        app.use(passport.initialize());
    }
    passport(){//authentication module
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
    }
    login(){//login module
        const loginHandler =(req, res, next)=>{
            passport.authenticate('local',{
                    successRedirect: '/employees',
                    failureRedirect: '/login',
                },(err, user, info, next)=>{
                    if (err) {
                        return  res.status(401).json({message: 'Wrong credentials'});
                    } else if(!user) {
                        return res.status(401).json({message: 'Wrong credentials'});
                    } else{
                        const token = jwt.sign({_id: user._id, name: user.username},
                            `${this.secret}`); //добавить SSH ключ, время жизни токена
                        res.json({token: `Bearer ${token}`});
                    }
            })(req, res, next);
        };
        app.post('/login', loginHandler);
    }
    checkAuthentication(){//routes protector, checks if request is authorized
        const mustBeAuthenticated = (req, res, next)=>{//check for grant access
            if (!this.openLinks.includes(req.headers.referer)){
                if(req.headers.authentication){
                    const [type, token] = req.headers.authentication.split(' ');
                    jwt.verify(token, this.secret, async (err, decoded)=>{
                        if(err){
                            res.status(401).json({message: 'Wrong token'});
                        } else{
                            const user = await User.findOne({_id: decoded._id});
                            if (decoded._id == user._id){
                                req.user = decoded;
                                next();
                            }
                        }
                    });
                } else{
                    res.status(401).json({message: 'No token passed'});
                }
            } else
                next();
        };
        app.all(mustBeAuthenticated);//scanning all urls to grant access
    }
    requestHandler(){//request handler
        // login start
        app.get('/login', async (req, res)=>{//render login
            res.sendFile('loginForm.html', {root: path.resolve(__dirname, './public')});
        });
        app.post('/logout*', (req, res)=>{
            req.logout();
            res.redirect('/login');
        });
        // login end

        // employees start
        app.get('/employees', async (req,res)=>{//send main page
            res.sendFile('employeesList.html', {root: path.resolve(__dirname, './public')});
        });
        app.get('/employee', async (req,res)=>{//open an employee
            res.sendFile('employee.html', {root: path.resolve(__dirname, './public')});
        });
        app.get('/employees/data', async (req,res)=>{//send main page data
            const data = await Employee.find();
            res.json({data});
        });
        app.get('/employees/:id', async (req,res)=>{//open an employee
            const data = await Employee.findById(req.params.id);
            res.json(data);
        });

        app.post('/employees*', async (req,res)=>{//open an employee
            let data = new Employee(req.body);
            data = await data.save();
            res.json(data);
        });
        app.delete('/employees*', async (req, res)=>{//remove specific item
            const employee = await Employee.findByIdAndRemove(req.body.id);
            res.json(employee);
        });
        app.put('/employees*', async (req, res)=>{
            const employee = await Employee.findByIdAndUpdate(
                req.body._id, req.body
            );
            res.json(employee);
        });
        app.patch('/employees*', async (req, res)    =>{
            const employee = await Employee.findByIdAndUpdate(
                req.body.id, {$set: req.body.param}
            );
            res.json(employee);
        });
        // employees end

        // notes start
        app.get('/notifications*', async (req,res)=>{//get all notes
            const data = await Note.find();
            res.json({data});
        });
        app.post('/notifications*', async (req,res)=>{//add new note
            let data = new Note(req.body);
            data = await data.save();
            res.json(data);
        });
        app.delete('/notifications*', async (req, res)=>{//remove specific note
            const data = await Note.findByIdAndRemove(req.body.id);
            res.json(data);
        });
        // notes end

        // 404
        app.get('*', (req, res)=>{
            res.sendFile('404.html', {root: path.resolve(__dirname, './public')});
        });
        // 404
    }
    socket(){
        io.on('connection', (socket)=>{
            console.log('Socket connection is on');
            socket.on('note', (note)=>{
                note.timestamp = new Date();
                note.socketId = socket.id;
                socket.broadcast.emit('note', note);
                socket.emit('note', note);
            });
            socket.on('disconnect', ()=>{
                console.log('Socket connection is off');
            })
        });
    }
    listen(){
        // app.listen(8889, ()=>{
        //     console.log('express server has been started');
        // });
        server.listen(8889, ()=>{
            console.log('socket server has been started');
        });
    }
    chromeLanuncher(){
        chromeLauncher.launch({
            startingUrl: 'http://localhost:8889/login'
        }).then(chrome => {
            console.log(`Chrome debugging port running on 8889`);
        });
        // chromeLauncher.launch({
        //     startingUrl: 'http://localhost:8889/login'
        // }).then(chrome => {
        //     console.log(`Chrome debugging port running on 8889`);
        // });
    }
    start(){

    }
}

const newEmployeesList = new EmployeesList();
module.exports = EmployeesList;

// защита страниц, проверка токена на всех этапах