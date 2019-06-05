const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27019/todo', { useNewUrlParser: true });

const Todos = require('./models/todo');

app.get('/', (req, res) => {
    const todo
    res.send('')
})

app.listen(8888, () => console.log(`Server started with port 8888`));