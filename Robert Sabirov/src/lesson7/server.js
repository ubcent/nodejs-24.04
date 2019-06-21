const path = require('path');

const express = require('express');
const mongoose = require('mongoose');

const session = require('cookie-session');
const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');
const cors = require('cors');

const config = require('./config');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(`mongodb://${config.hostDb}:${config.portDb}/${config.dbName}`, { useNewUrlParser: true });
const User = require('./models/user');

const refreshTokens = {};

app.post('/auth/token/reject', function (req, res, next) {
    const { refresh_token } = req.body;
    if (refresh_token in refreshTokens) {
        delete refreshTokens[refresh_token];
        res.sendStatus(204);
    } else {
        res.send(401).json({ message: 'Wrong refreshTokens' });
    }
})

app.post('/auth/token', async (req, res) => {
    const { username, refresh_token } = req.body;
    if ((refresh_token in refreshTokens) && (refreshTokens[refresh_token] == username)) {
        const user = await User.findOne({ username: username });
        const token = jwt.sign({ name: user.name, username: user.username }, 'secretString');//, { expiresIn: 300 })
        res.json({ access_token: token });
    }
    else {
        res.send(401).json({ message: 'Wrong refreshTokens' });
    }
})

app.post('/auth', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && user.checkPassword(password)) {
        delete user.password;
        const token = jwt.sign({ name: user.name, username: user.username }, 'secretString')//; { expiresIn: 30 });
        const refresh_token = randtoken.uid(256);
        refreshTokens[refresh_token] = user.username;
        res.json({ access_token: token, refresh_token: refresh_token });
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