/*jshint esversion: 6 */

const path = require('path');
const express = require('express');
const consolidate = require('consolidate');

const app = express();

const users = {
    '1': {
        name: 'Vasya',
        online: true,
    },
    '2': {
        name: 'Petya',
        online: false,
    },
};

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.use(express.json());

app.use((req, res, next) => {
    console.log('Middleware1');
    next();
});

app.use('/public', express.static(path.resolve(__dirname, 'public')));

app.use((req, res, next) => {
    console.log('Middleware2');
    next();
});

app.all('/', (req, res, next) => {
    console.log('Common handler');
    next();
});

app.get('/', (req, res) => {
    console.log('Exact handler');
    res.send('Hi, world!');
});

app.get('/users', (req, res) => {
    res.send('Hi, USERS!');
});

app.get('/users/:id/', (req, res) => {
    res.render('user', users[req.params.id]);
});

app.get('/users/:id', (req, res) => {
    res.send(`<p>Hi, USER# ${req.params.id}!</p>`);
});

app.post('/users', (req, res) => {
    console.log(req.body);
    res.send('OK');
});

app.listen(8888, () => {
    console.log('Server has been started!');
});