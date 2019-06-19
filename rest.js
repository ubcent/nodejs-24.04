const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');

// mongoose.connect('mongodb://192.168.99.100:32773/stream', { useNewUrlParser: true });

// client - domain.com
// server(api) - api.domain.com

// OPTIONS -> api.domain.com
// server(api) -> Access-Control-Allow-Origin: domain.com

const app = express();

app.use(express.json());
app.use(cors());

const User = require('./models/user');

app.use(express.static(path.resolve(__dirname, 'public')));

const verifyToken = (req, res, next) => {
  if(req.headers.authorization) {
    const [type, token] = req.headers.authorization.split(' ');
    jwt.verify(token, 'secret', (err, decoded) => {
      if(err) {
        res.status(401).json({ message: 'Wrong token' });
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).json({ message: 'No token present' });
  }
}

app.post('/auth', (req, res) => {
  const { username, password } = req.body;

  if(username === 'admin' && password === 'admin') {
    const token = jwt.sign({ name: 'Dmitry', surname: 'Bondarchuk' }, 'secret');
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Wrong credentials' });
  }
});

app.all('/users*', verifyToken);

app.get('/users', async (req, res) => {
  console.log(req.user);
  // const users = await User.find();
  res.json([]);
});

app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);

  res.json(user);
});

app.post('/users', async (req, res) => {
  let user = new User(req.body);
  user = await user.save();

  res.json(user);
});

// full update
app.put('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body);

  res.json(user);
});

// partial update
app.patch('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body });

  res.json(user);
});

app.listen(8888, () => {
  console.log('Server has been started!');
});

/*
  * Аутенификация. Результат - токен (2)
    * access_token
    * refresh_token
*/
/*
  * Борис - злоумышленник, Анна - пользователь
    * Борис украл у Анны access_token
    * Борис украл access_token и refresh_token
*/