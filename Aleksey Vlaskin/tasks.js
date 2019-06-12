const path = require('path');

const express = require('express');
const consolidate = require('consolidate');
const mongoose = require('mongoose');

const Task = require('./models/task');

mongoose.connect('mongodb://192.168.99.100:32768/todolist', { useNewUrlParser: true });

const app = express();

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.use('/public', express.static(path.resolve(__dirname, 'public')));

app.use(express.json());

app.get('/tasks', async(req, res) => {
    const tasks = await Task.find();
    const tasksObj = { tasks };
    res.render('tasks', tasksObj);
});

app.post('/tasks', async (req, res) => {
    let task = new Task(req.body);
    task = await task.save();
    res.send(task);
});

app.delete('/tasks', async(req, res) => {
    const task = await Task.findByIdAndRemove(req.body.id, {useFindAndModify: false});
    res.send(task);
});

app.put('/tasks', async(req, res) => {
    const task = await Task.findByIdAndUpdate(req.body.id, {state: true}, {useFindAndModify: false});
    res.send(task);
});

app.get('*', (req, res) => res.send('404'));

app.listen(8050, () => {
    console.log('Server has been started!');
});