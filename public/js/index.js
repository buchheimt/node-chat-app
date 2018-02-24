const socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = $('<li></li>');
  li.text(`${message.from} - ${formattedTime}: ${message.text}`);
  $('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current location</a>');
  var formattedTime = moment(message.createdAt).format('h:mm a');

  li.text(`${message.from} - ${formattedTime}:`);
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);
});


$('#message-form').on('submit', function(e) {
  e.preventDefault();

  var $messageInput = $('[name=message]');

  socket.emit('createMessage', {
    from: $('[name=username]').val(),
    text: $messageInput.val()
  }, function() {
    $messageInput.val('');
  });
});

var $locationButton = $('#send-location');
$locationButton.on('click', function() {
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
  }, function() {
    alert('Unable to fetch location');
    $locationButton.removeAttr('disabled').text('Send Location');
  });
});