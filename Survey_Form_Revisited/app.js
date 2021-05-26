const express = require('express');
const session = require('express-session');
const app = express();
const server = app.listen(7000);
const io = require('socket.io')(server);

app.use(express.urlencoded({extended: true}))

app.use(express.static(__dirname + '/assets'));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 6000 }
}))

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index')
})

io.on('connection', function(socket){
    socket.on('posting_form', function(data){
        let random_number = Math.floor(Math.random() * 1000 + 1)
        socket.emit('updated_form', {response: data})
        socket.emit('random_number', {response: random_number})
    })
})
