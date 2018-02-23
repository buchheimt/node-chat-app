const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to Super Chat!',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'A new user has joined Super Chat!',
    createdAt: new Date().getTime()
  });
  
  socket.on('createMessage', message => {
    console.log(`New message from ${message.from}:`, message.text);

    // io.emit('newMessage', {
    //   ...message,
    //   createdAt: new Date().getTime()
    // });
    // socket.broadcast.emit('newMessage', {
    //   ...message,
    //   createdAt: new Date().getTime()
    // });
  });


  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

// Run

server.listen(port, () => console.log(`Listening on port ${port}`));