const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const consolidate = require ('consolidate');
const Strategy = require('passport-local').Strategy;
const Task = require('./models/tasks');
const  User = require('./models/user_task');


const app = express();
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.engine('html', consolidate.handlebars);
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, 'pages'));



mongoose.connect('mongdb://192.168.84.155:32754/local', {useNewUrlParser: true});

passport.use(new  Strategy(async (username, password, done) => {
    const user = await User.findOne({username});
    if(user && user.checkPassword(password)){
        delete user.password;
        return done(null, user);
    } else{
        return done(null, false);
    }
}));

passport.serializeUser((user, done) =>{
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

const  authHandler = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login_page',
});

const  isAuthenticated = (req, res, next) => {
    if(req.user){
        next()
    }else{
        res.redirect('/login_page');
    }
};

app.all('/user*', isAuthenticated);

app.get('/', (req, res) => {
    res.render('index_less6')
});

app.get('/new_user_page', (req, res) => {
    res.render('new_user_page')
});

app.post('/new_user_page', async (req, res) => {
    let user = new User(req.body);
    user = await user.save();
    res.send(user);
});

app.get('/login_page', (req, res) => {
    res.render('login_page')
});

app.post('/login_page', authHandler);

app.get('/login_page', (reg, res) => {
    reg.logout();
    res.redirect('/');
});

app.get('/user/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.render('tasks', {
        tasks,
        title: 'Tasks list'
    });
});

app.get('/user/tasks/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.send(task);
});

app.post('/user/tasks', async  (req, res) => {
    let task = new Task(req.body);
    task = await task.save();
    res.send(task);
});

app.put('/user/tasks/:id', async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body);
    res.send(task);
});

app.delete('/user/tasks/:id', async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.send(task);
});


app.get('*', (req, res) => {
    res.send(`ERROR`)
});

app.listen(8888, () => {
    console.log('Server has been started! 8888')
});

//заглушка для ДЗ 7