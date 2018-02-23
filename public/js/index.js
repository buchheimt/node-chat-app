const socket = io();

    socket.on('connect', function() {
      console.log('Connected to server');

      socket.emit('createMessage', {
        from: 'Me',
        text: 'Look what I made!'
      });
    });

    socket.on('newMessage', function(message) {
      console.log(`New message from ${message.from}:`, message.text);
    });


    socket.on('disconnect', function() {
      console.log('Disconnected from server');
    });

    