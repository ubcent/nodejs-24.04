const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:32772/taskdb', { useNewUrlParser: true });
const Task = require('./models/mongoTask');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.use(express.json());
app.use('/public', express.static(path.resolve(__dirname, 'public')));
//app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'task.html'));
});

io.on('connection', socket => {
  console.log('Connection has been established!!!');

  socket.on('message', message => {
    let task = new Task(message);
    console.log(task);
    task = task.save();
    message.timestamp = new Date();

    socket.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Connection has been ended!');
  });
});
//ПОЛУЧАЕМ ВСЕ ЗАДАЧИ
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();

  res.send(tasks);
});

//ПОЛУЧАЕМ ЗАДАЧУ ПО ID
app.get('/tasks/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);

  res.send(task);
});

//СОЗДАЕМ НОВУЮ ЗАДАЧУ
app.post('/tasks', async (req, res) => {
  let task = new Task(req.body);
  task = await task.save();
  res.send(task);
});

//РЕДАКТИРУЕМ ЗАДАЧУ
app.put('/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body);
  res.send(task);
});

//ОТМЕЧАЕМ ЗАДАЧУ КАК ВЫПОЛНЕННУЮ
app.put('/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body);
  res.send(task);
});

//УДАЛЯЕМ ЗАДАЧУ
app.post('/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndRemove(req.params.id, req.body);
  res.send('The Task has been removed!');
});

server.listen(8888, () => {
  console.log('Server has been started at 8888!');
});
