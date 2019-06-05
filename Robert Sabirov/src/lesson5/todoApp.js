const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27019/todo', { useNewUrlParser: true });

const Todo = require('./models/todo');

app.get('/', async (req, res) => {
    const todos = await Todo.find();
    res.send(todos);
})

app.get('/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    res.send(todo);
})

app.post('/', async (req, res) => {
    let todo = new Todo(req.body);
    todo = await todo.save();

    res.send(todo);
})

app.post('/:id', async (req, res) => {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body);

    res.send(todo);
})

app.listen(8888, () => console.log(`Server started with port 8888`));