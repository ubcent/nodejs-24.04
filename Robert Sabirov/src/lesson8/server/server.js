const http = require('http');
const path = require('path');

const express = require('express');
const socketIO = require('socket.io');
const mongoose = require('mongoose');

const config = require('./config');

mongoose.connect(`mongodb://${config.hostDb}:${config.portDb}/${config.dbName}`, { useNewUrlParser: true });
const Todo = require('./models/todo');


const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.use(express.json());

app.use('/public', express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(
        path.resolve(__dirname, 'public', 'index.html')
    )
})

//begin WebSockets
io.on('connection', (socket) => {
    console.log('New connection WebSockets');
    socket.on('task', async (task) => {
        task = { ...task, status: true }
        console.log('new task: ' + task);
        let todo = new Todo(task);
        todo = await todo.save();

        socket.broadcast.emit('task', task);

        socket.emit('task', task);
    })

    socket.on('disconnect', () => {
        console.log('Disconnected WebSockets')
    })
});
//end WebSockets


//begin REST API
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post('/todos', async (req, res) => {
    let todo = new Todo(req.body);
    todo = await todo.save();
    res.json(todo);
});

app.put('/todos/:id', async (req, res) => {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body);
    res.json(todo);
});

app.patch('/todos/:id', async (req, res) => {
    const todo = await Todo.findByIdAndUpdate(req.params.id, { $set: req.body });
    res.json(todo);
});

app.delete('/todos/:id', async (req, res) => {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    res.json(todo);
});
//end REST API

server.listen(config.port, () => {
    console.log(`Server has been started (port ${config.port})`);
});