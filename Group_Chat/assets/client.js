const socket = io.connect('http://localhost:7000');

//submit text message without reload/refresh the page
$('form').submit( function(e){
    e.preventdefault();
    $('#text').val('');
    return false;
})

//append the chat text message
socket.on('chat_message', (msg) =>{
    $('#messsages').append($('<li>').html(msg));
})

//append text if someone is online
socket.on('is_online', (username) => {
    $('#messages').append($('<li>').html(username));
})

//ask username
var username = promt('Please tell me your name');
socket.emit('username', username);