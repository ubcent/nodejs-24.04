const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/task');

const app = express();

mongoose.connect('mongodb://192.168.99.100:32768/local', {useNewUrlParser: true});

//получить все задачи
app.get('./tasks', async (req, res) => {
	const tasks = await Task.find();
	res.send(tasks);
});

//получить одну задачу по ID
app.get('./tasks/:id', async (reg, res) => {
	const task = await Task.findById(req.params.id);
	res.send(task);
});

//добавить задачу
app.post('./tasks', async  (req, res) => {
	let task = new Task(req.body);
	user = await task.save();
	res.send(task);
});

//изменить задачу, или отметить выполненной
app.put('/tasks/:id', async (req, res) => {
	const task = await Task.findByIdAndUpdate(req.params.id, req.body);
	res.send(task);
});

app.put('/tasks/:id', async (req, res) => {
	const task = await Task.remove(req.params.id, req.body);
	res.send(task);
});


app.get('*', (req, res) => {
	res.send(`ERROR`)
});


app.listen(8888, () => {
	console.log('Server has been started! 8888')
});