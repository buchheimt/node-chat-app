const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name and room are required.');
    }

    socket.join(params.room);

    socket.emit('newMessage', generateMessage(
      'Admin',
      'Welcome to Super Chat!',
    ));

    socket.broadcast.to(params.room).emit('newMessage', generateMessage(
      'Admin',
      `${params.name} has joined ${params.room}`,
    ));

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    console.log(`New message from ${message.from}:`, message.text);

    io.emit('newMessage', generateMessage(
      message.from,
      message.text,
    ));
    callback('This is from the server.');
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage(
      'Admin',
      coords.latitude,
      coords.longitude,
    ));
  });


  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

// Run

server.listen(port, () => console.log(`Listening on port ${port}`));
