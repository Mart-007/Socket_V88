const express = require('express');
const session = require('express-session');
const app = express();
const server = app.listen(7000, () => {
    console.log("Server running on port 7000");
});
const io = require('socket.io')(server);

app.use(express.static(__dirname + "/assets"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(session({
    secret: 'alaws lods',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 },
}))

app.get('/', (req, res) => {
    res.render('index');
})

io.on('connection', (socket) => {
    socket.on('username', (username) => {
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username +' ' + 'join the chat..</i>');
    });
    socket.on('disconnect', (username) => {
        io.emit('is_online', '🔴 <i>' + socket.username + ' ' + 'left the chat..</i>');
    })
    socket.on('chat_message', (message) => {
        io.emit('chat_message', '<strong>' + socket.username + '<strong>:' + message);
    })
})



