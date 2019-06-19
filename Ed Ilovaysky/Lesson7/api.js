const path = require('path');

const express = require('express');
const consolidate = require('consolidate');
const bodyParser = require('body-parser');

const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:32770/users', { useNewUrlParser: true });

const app = express();

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(cors());

const User = require('./models/mongo');
const secret = 'J{Nkja0kvn[348jas0u9ulkkk0fjl0';

const verifyToken = (req, res, next) => {
  if (req.headers.authorization) {
    const [type, token] = req.headers.authorization.split(' ');
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Wrong token' });
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).json({ message: 'No token present' });
  }
};

app.post('/', async (req, res) => {
  const { login, password } = req.body;
  const user = await User.findOne({ login });
  if (login === user.login && password === user.password) {
    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: 180,
    });
    res.set({
      'Content-type': 'aplication/json',
      Authorization: `Bearer ${token}`,
    });
    res.send(`Hello, 
        <i>${user.login}</i>
        <hr>
       <i>please:</i>  <br>
        <a href="/users">TEST USERS PAGES</a>`);
  } else {
    res.status(401).json({ message: 'Wrong credentials' });
  }
});
app.get('/', (req, res) => {
  res.render('user', {
    login: 'Введите Ваш логин',
    password: 'Введите Ваш пароль',
    value: 'Отправить',
  });
});
app.post('/reg', async (req, res) => {
  let user = new User(req.body);
  user = await user.save();

  res.send('Hello, ' + user.login);
});
app.get('/reg', (req, res) => {
  res.render('userreg', {
    login: 'Введите Ваш логин',
    password: 'Введите Ваш пароль',
    value: 'Отправить',
  });
});

app.all('/users*', verifyToken);

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json({ users });
});

app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);

  res.json(user);
});

app.put('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body);

  res.json(user);
});

app.patch('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body });

  res.json(user);
});

app.listen(8888, () => {
  console.log('API has been lounched at 127.0.0.1:8888!');
});
