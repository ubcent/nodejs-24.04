const path = require('path');
const express = require('express');
const consolidate = require('consolidate');

const mongoose = require('mongoose');

mongoose.connect('mongodb:/localhost:32776/taskdb', { useNewUrlParser: true });
const Tasks = require('./models/mongoTask');

const app = express(); // CREATING EXPRESS-APP OBJECT

//SWITCH ON  CONSOLIDATE WITH SEMANTIC TEMPLATE WICH IS HANDLEBARS AND CONFIG IT
app.engine('hbs', consolidate.handlebars); //РЕГИСТРИРУЕМ ШАБЛОНИЗАТОР В ПРИЛОЖЕНИИ
app.set('view engine', 'hbs'); //УКАЗЫВАЕМ ШАБЛОНЫ ПО УМОЛЧАНИЮ
app.set('views', path.resolve(__dirname, 'views')); //УКАЗЫВАЕМ ПУТЬ К НАШИМ VIEWS

// BODY-PARSER

app.use(express.json());
app.use('/public', express.static(path.resolve(__dirname, 'public')));
//app.use(express.urlencoded());

//ПОЛУЧАЕМ ВСЕ ЗАДАЧИ
app.get('/tasks', async (req, res) => {
  const tasks = await Tasks.find();
  res.send(tasks);
});

//ПОЛУЧАЕМ ЗАДАЧУ ПО ID
app.get('/tasks/:id', async (req, res) => {
  const tast = await Tasks.findById(req.params.id);

  res.send(task);
});

//СОЗДАЕМ НОВУЮ ЗАДАЧУ
app.post('/tasks', async (req, res) => {
  let task = new Tasks(req.body);
  task = await task.save();
  res.send(task);
});

//РЕДАКТИРУЕМ ЗАДАЧУ
app.put('/tasks/:id', async (req, res) => {
  const task = await Tasks.findByIdAndUpdate(req.params.id, req.body);
  res.send(task);
});

//ОТМЕЧАЕМ ЗАДАЧУ КАК ВЫПОЛНЕННУЮ
app.put('/tasks/:id', async (req, res) => {
  const task = await Tasks.findByIdAndUpdate(req.params.id, req.body);
  res.send(task);
});

//УДАЛЯЕМ ЗАДАЧУ
app.post('/tasks/:id', async (req, res) => {
  const task = await Tasks.findByIdAndRemove(req.params.id, req.body);
  res.send('The Task has been removed!');
});

app.listen(8888, () => {
  console.log('Server has been started!');
});
