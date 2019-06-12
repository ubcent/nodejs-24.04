const path = require('path');
const express = require('express');
const consolidate = require('consolidate');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:32773/taskbase', {
  useNewUrlParser: true
});

const Task = require('./models/task');

const app = express();

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));
app.use(express.json());

app.get('/', async (req, res) => {
  res.render('lesson5')
})

app.post('/', async (req, res) => {
  if (req.body.task !== '') {
    let task = new Task(req.body);
    task = await task.save();
  }
  const tasks = await Task.find();
  res.render('todo', {
    todo: tasks,
  });

});

app.delete('/', async (req, res) => {
  let task = await Task.find({
    task: req.body.task
  });
  task = task[0];
  task = task._id;
  await Task.findByIdAndRemove(task, req.body);
  const tasks = await Task.find();
  res.render('todo', {
    todo: tasks,
  });
});


app.listen(8888, () => {
  console.log('Server has been started!');
});