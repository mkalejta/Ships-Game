const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routing = require("./routing");
const middleware = require("./routing/middleware");
const app = express();
const { Server } = require('socket.io');
const PORT = 3000;
const { instrument } = require("@socket.io/admin-ui");
const Player = require('./objects/Player');
const game = require('./routing/game');


const expressServer = app.listen(PORT, () => {
    console.log(`Backend listens on port ${PORT}`);
});
const io = new Server(expressServer, {
    cors: {
        origin: ["https://admin.socket.io"],
        credentials: true,
    },
});
instrument(io, {
    auth: false
});


// Ustawienia widoków
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../client/views"));

app.use(express.static(path.join(__dirname, "../client/public")));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", middleware, routing);


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


const alerts = {}; // Sygnały w fazie przygotowań są tymczasowe dlatego nie ma potrzeby zapisywac ich w bazie danych
const Letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

io.on('connection', socket => {
    console.log('a user connected')

    socket.on('move', ({ player, move }, cb) => {
        console.log(move)
        const [ x, y ] = move
        const letter = Letters[x]
        const message = `${player}: ${letter} ${y}`
        io.emit('message', message)

        cb()
    })

    socket.on('hit', () => {
        io.emit('message', 'Hit!')
    })

    socket.on('sink', () => {
        io.emit('message', 'Hit & Sink!')
    })

    socket.on('join game', ({ player, gameId }, cb) => {
        if(!alerts[gameId]) {
            alerts[gameId] = []
        }

        socket.join(gameId)
        const alert = `${player} has joined game`

        if (!alerts[gameId].includes(alert)) {
            alerts[gameId].push(alert)
            io.to(gameId).emit('add alert', alert)
        }

        cb(alerts[gameId])
    })

    socket.on('ready', ({ player, gameId }, cb) => {
        if(!alerts[gameId]) {
            alerts[gameId] = []
        }
        const alert = `${player} is ready`

        if (!alerts[gameId].includes(alert)) {
            alerts[gameId].push(alert)
            io.to(gameId).emit('add alert', alert)
        }

        io.to(gameId).emit('start game')

        cb(alerts[gameId])
    })
});