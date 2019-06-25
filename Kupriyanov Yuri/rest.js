const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const user = require('./models/user');
const serverConfing = require('./config/server');

serverParams = serverConfing.getParams();

const app = express();

app.use(express.json());
app.use(cors());

const verifyToken = (req, res, next) => {
  if(req.headers.authorization) {
    const [type, token] = req.headers.authorization.split(' ');
    jwt.verify(token, serverParams.jwtsecret, (err, decoded) => {
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

app.post('/auth', async (req, res) => {
  const { username, password } = req.body;
  const authuser = await user.findOne( username );
  if(authuser && user.checkPassword(password)) {
    const token = jwt.sign({ name: 'username', }, serverParams.jwtsecret);
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Wrong credentials' });
  }
});

app.all('/users*', verifyToken);

app.get('/users', async (req, res) => {
  console.log(req.user, req.token);
  res.json([await user.getAll()]);
});

app.get('/users/:id', async (req, res) => {
  const user = await user.getByID(req.params.id); 
  res.json(user);
});

app.post('/users', async (req, res) => {
  const id = await user.add(req.body);
  res.json(id);
});

// full update
app.put('/users/:id', async (req, res) => {
  const user = await user.update(req.params.id, req.body);
  res.json(user);
});

// partial update
app.patch('/users/:id', async (req, res) => {
  const user = await user.update(req.params.id,  { $set: req.body });
  res.json(user);
 });

app.listen(serverParams.port, () => {
  console.log(`Server has been started at port: ${serverParams.port} `);
});

