const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const consolidate = require ('consolidate');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const Task = require('./models/task');
const  User = require('./models/user');



const app = express();
app.use(express.json());
app.use(cors());
app.engine('html', consolidate.handlebars);
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, 'pages'));

const verifyToken = (req, res, next) => {
	if(req.headers.authorization){
		const [type, token] = req.headers.authorization.split(' ');
		jwt.verify(token, 'secret', (err, decoded) => {
			if(err){
				res.status(401).json({message: 'Wrong token'});
			}
			req.user = decoded;
			next();
		});
	}else{
		res.status(401).json({message: 'No token present'});
	}
};

mongoose.connect('mongodb://192.168.99.100:32768/local', {useNewUrlParser: true});

app.all('/user/*',verifyToken);

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
	const token = jwt.sign({name: user.username}, 'secret', {expiresIn : '1h'});
	user = await user.save();
	res.json({token, user});
});

// страница авторизации
app.get('/login', (req, res) => {
	res.render('login')
});

//авторизация
app.post('/login', async (req, res) => {
	const user = await User.findOne(req.body);
	if(user.username && user.checkPassword(user.password)){
		const token = jwt.sign({name: user.username}, 'secret', {expiresIn : '1h'});
		res.json({token});
	} else{
		res.status(401).json({message: 'Wrong credentials'});
	}
});


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
	res.json(task);
});

//добавить задачу
app.post('/user/tasks', async  (req, res) => {
	let task = new Task(req.body);
	task = await task.save();
	res.json(task);
});

//изменить задачу, или отметить выполненной
app.put('/user/tasks/:id', async (req, res) => {
	const task = await Task.findByIdAndUpdate(req.params.id, req.body);
	res.json(task);
});

// удалить задачу
app.delete('/user/tasks/:id', async (req, res) => {
	const task = await Task.findByIdAndDelete(req.params.id);
	res.json(task);
});


app.get('*', (req, res) => {
	res.send(`ERROR`)
});


app.listen(8888, () => {
	console.log('Server has been started! 8888')
});