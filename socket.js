const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.get('/', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, 'public', 'chat.html')
  );
});

io.on('connection', (socket) => {
  console.log('Connection has been established!!!');

  fs.readFile('./package.json', (err, data) => {
    socket.emit('data', data);
  });

  socket.on('message', (message) => {
    // TODO: save to database
    message.timestamp = new Date();
    message.socketId = socket.id;

    if(message.to) {
      socket.in(message.to).emit('message', message);
    } else {
      socket.broadcast.emit('message', message);
    }
    socket.emit('message', message);
  });

  socket.on('join', (room) => {
    socket.join(room);
  });

  socket.on('disconnect', () => {
    console.log('Connection has been ended!');
  });
});

server.listen(8888, () => {
  console.log('Server has been started!');
});