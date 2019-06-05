const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Task = require('./models/todoMySql');

app.get('/', async (req, res) => {
    const todos = await Task.getAll();
    res.send(todos);
})

app.get('/:id', async (req, res) => {
    const todo = await Task.get(req.params.id);

    res.send(todo);
})

app.post('/', async (req, res) => {
    const result = Task.add(req.body);
    res.send(result);
})

app.post('/:id', async (req, res) => {
    const task = await Task.update(req.params.id, req.body);
    res.sendStatus(200).send(task);
})

app.delete('/:id', async (req, res) => {
    const result = await Task.remove(req.params.id, req.body);
    res.sendStatus(200).send(result);
})

app.listen(8888, () => console.log(`Server started with port 8888`));