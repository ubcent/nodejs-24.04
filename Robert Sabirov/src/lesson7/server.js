const path = require('path');

const express = require('express');
const mongoose = require('mongoose');

const session = require('cookie-session');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const config = require('./config');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(`mongodb://${config.hostDb}:${config.portDb}/${config.dbName}`, { useNewUrlParser: true });

const User = require('./models/user');

app.post('/auth', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && user.checkPassword(password)) {
        delete user.password;
        const token = jwt.sign({ name: user.name, username: user.username }, 'secretString');
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Wrong credentials' });
    }
})

const verifyToken = (req, res, next) => {
    if (req.headers.authorization) {
        const [type, token] = req.headers.authorization.split(' ');
        jwt.verify(token, 'secretString', (err, decoded) => {
            if (err) {
                res.status(401).json({ message: 'Wrong token' });
            }
            req.user = decoded;
            next();
        });
    } else {
        res.status(401).json({ message: 'No token present' });
    }
}

app.all('/users*', verifyToken);

app.get('/users', async (req, res) => {
    const users = await User.find();

    res.json(users);
});

app.post('/users', async (req, res) => {
    let user = new User(req.body);
    user = await user.save();

    res.send(user);
});

app.put('/users/:id', async (req, res) => {
    const user = await User.findOneAndUpdate(req.params.id, req.body);

    res.json(user);
});

app.patch('/users/:id', async (req, res) => {
    const user = await User.findOneAndUpdate(req.params.id, { $set: req.body });

    res.json(user);
});

app.delete('/users/:id', async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id, req.body);

    res.send(user);
});

app.listen(config.port, () => {
    console.log(`Server has been started (port ${config.port})`);
})