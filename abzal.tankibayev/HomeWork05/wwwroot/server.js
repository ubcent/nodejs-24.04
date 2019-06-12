"use strict";

const express = require('express');
const Task = require('./controllers/tasks');
const app = express();
const PORT = 8888;
const HOST = `http://localhost`;

// Получить список задач
app.get('/', async (req, res) => {
    const list = await Task.get();
    res.send(list);
});

// Получить детализацию задачи по id
app.get('/:id', async (req, res) => {
    const task = await Task.details(req.params.id);
    res.send(task);
});

// Добавить задачу
app.post('/', async (req, res) => {
    const task = Task.add(req.body);
    res.send(task);
});

// Изменить задачу
app.post('/:id', async (req, res) => {
    const result = await Task.update(req.params.id,req.body);
    res.send(result);
});

// Удалить задачу по id
app.delete('/:id', async (req, res) => {
    const result = await Task.delete(req.params.id,req.body);
    res.send(result);
});

app.listen(PORT, ()=>{
    console.log(`Server started on ${HOST}:${PORT}`);
});
