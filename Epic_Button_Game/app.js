const express = require('express');
const session = require('express-session');
const app = express();
const server = app.listen(7000, () => {
    console.log("Server is running on port 7000");
})
const io = require("socket.io")(server);

app.use(express.static(__dirname + '/assets'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
}))

app.get('/', (req, res) => {

    io.on('connection', (socket) => {
        socket.on('epic-button', (data) => {
            socket.emit('counter', {counter: parseInt(data.counter) + 1});
            // socket.broadcast.emit('counter', {counter: parseInt(data.counter) + 1});

        });
        socket.on('reset', (data) => {
            socket.emit('counter', { counter: 0});
        });
    })

    res.render('index');
})