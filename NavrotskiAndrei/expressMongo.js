const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const consolidate = require ('consolidate');
const Strategy = require('passport-local').Strategy;
const Task = require('./models/task');
const  User = require('./models/user');


const app = express();
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.engine('html', consolidate.handlebars);
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, 'pages'));



mongoose.connect('mongodb://192.168.99.100:32768/local', {useNewUrlParser: true});

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
	failureRedirect: '/login',
});

const  mustBeAuthenticated = (req, res, next) => {
	if(req.user){
		next()
	}else{
		res.redirect('/login');
	}
};

app.all('/user*', mustBeAuthenticated);

// home
app.get('/', (req, res) => {
	res.render('home')
});

// страница регистрации
app.get('/registration', (req, res) => {
	res.render('registration')
});

//добавить пользователя
app.post('/registration',async (req, res) => {
	let user = new User(req.body);
	user = await user.save();
	res.send(user);
});

// страница авторизации
app.get('/login', (req, res) => {
	res.render('login')
});

//авторизация
app.post('/login', authHandler);


app.get('/logout', (reg, res) => {
	reg.logout();
	res.redirect('/');
});

//получить все задачи
app.get('/user/tasks', async (req, res) => {
	const tasks = await Task.find();
	res.render('tasks', {
		tasks: tasks,
		title: 'Список заданий'
	});
});

//получить одну задачу по ID
app.get('/user/tasks/:id', async (req, res) => {
	const task = await Task.findById(req.params.id);
	res.send(task);
});

//добавить задачу
app.post('/user/tasks', async  (req, res) => {
	let task = new Task(req.body);
	task = await task.save();
	res.send(task);
});

//изменить задачу, или отметить выполненной
app.put('/user/tasks/:id', async (req, res) => {
	const task = await Task.findByIdAndUpdate(req.params.id, req.body);
	res.send(task);
});

// удалить задачу
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