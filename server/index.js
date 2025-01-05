const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routing = require("./routing");
const middleware = require("./routing/middleware");
const app = express();
const socket = require('socket.io');
const PORT = 3000;

const expressServer = app.listen(PORT, () => {
    console.log(`Backend listens on port ${PORT}`);
});

// Ustawienia widoków
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../client/views"));

app.use(express.static(path.join(__dirname, "../client/public")));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", middleware, routing);

const io = new socket.Server(expressServer, {
    cors: { origin: "*" }
});


// Generowanie widoków
app.get('/', (req, res) => {
    res.render("home.ejs");
});

app.get('/game', (req, res) => {
    res.render("games.ejs");
})

app.get('/game/create', (req, res) => {
    res.render("createGame.ejs");
})

app.get('/game/:id/join', (req, res) => {
    res.render('joinGame.ejs');
})

app.get('/game/:id', (req, res) => {
    res.render("game.ejs");
})

app.get('/game/:id/prep', (req, res) => {
    res.render("prep.ejs");
})


io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('move', (move) => {
        console.log(move);
        io.emit('message', move);
    })
})