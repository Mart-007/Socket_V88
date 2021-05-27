const express = require('express');
const session = require('express-session');
const app = express();
const server = app.listen(7000, () => {
    console.log("Server running on port 7000");
})
const io = require('socket.io')(server);

app.use(express.static(__dirname + "/assets"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 },
}));

io.on('connection', (socket) => {
    socket.on('setColor', (data) => {
        if(data.color == "green"){
            color = "#198754";
        }
        else if(data.color == "blue"){
            color = "#0d6efd";
        }
        else if(data.color == "pink"){
            color = "#d63384"
        }
        else{
            return false;
        }

    socket.emit('color', { data: color });
    });


    socket.on("new_connection", (data) => {
        console.log(data.msg);
        socket.emit("color", { data: color });
    });

    socket.on("disconnect", () => {
        console.log("disconnected");
    });
});
app.get('/', (req, res) => {
    res.render('index');
})