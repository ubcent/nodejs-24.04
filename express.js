// https://github.com/tj
const path = require('path');

const express = require('express');
const consolidate = require('consolidate');
const mongoose = require('mongoose');

// typeorm
mongoose.connect('mongodb://192.168.99.100:32773/stream', { useNewUrlParser: true });

const User = require('./models/user');

const app = express();

const users = {
  '1': {
    name: 'Vasya Pupkin',
    online: true,
  },
  '2': {
    name: 'Kolya Pupkin',
    online: false,
  }
}

// SOAP BFF
app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

// body-parser начиная с express v4 стал частью самого фреймворка
app.use(express.json());

app.use((req, res, next) => {
  console.log('Middleware1');
  next();
});

app.use(express.static(path.resolve(__dirname, 'public')));

app.use((req, res, next) => {
  console.log('Middleware2');
  next();
});

app.all('/', (req, res, next) => {
  console.log('Common handler');
  next();
});

app.get('/users', async (req, res) => {
  const users = await User.find();

  res.send(users);
});

app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);

  res.send(user);
});

app.post('/users', async (req, res) => {
  let user = new User(req.body);
  user = await user.save();

  res.send(user);
});

app.put('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body);

  res.send(user);
});

app.get('/', (req, res) => {
  console.log('Exact handler');
  res.send('Hello world!');
});

app.get('/users', (req, res) => {
  res.send('Hello USERS');
});

app.get('/users/:id', (req, res) => {
  res.render('user', users[req.params.id]);
});

app.get('/users/:id/:name', (req, res) => {
  res.send(`Hello USER# ${req.params.id} ${req.params.name}`);
});

app.post('/users', (req, res) => {
  console.log(req.body);
  res.send('OK');
});

app.listen(8888, () => {
  console.log('Server has been started!');
});