const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', message => {
  const formattedTime = moment(message.createdAt).format('h:mm a');

  const template = $('#message-template').html();
  const html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
});

socket.on('newLocationMessage', message => {
  const formattedTime = moment(message.createdAt).format('h:mm a');

  const template = $('#location-message-template').html();
  const html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
});


$('#message-form').on('submit', e => {
  e.preventDefault();

  const $messageInput = $('[name=message]');

  socket.emit('createMessage', {
    from: $('[name=username]').val(),
    text: $messageInput.val()
  }, () => {
    $messageInput.val('');
  });
});

const $locationButton = $('#send-location');
$locationButton.on('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  $locationButton.attr('disabled', 'disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function(position) {
    $locationButton.removeAttr('disabled').text('Send Location');

    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, () => {
    alert('Unable to fetch location');
    $locationButton.removeAttr('disabled').text('Send Location');
  });
});