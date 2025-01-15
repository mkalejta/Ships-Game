const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routing = require("./routing");
const middleware = require("./routing/middleware");
const app = express();
const { Server } = require('socket.io');
const PORT = 3000;
const { instrument } = require("@socket.io/admin-ui");
const cookieParser = require('cookie-parser');
require("dotenv").config();


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

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routing);
app.use("*/game", middleware);


// Generowanie widoków
app.get('/', (req, res) => {
    res.render("home.ejs");
});

app.get('/game', (req, res) => {
    console.log(req.user);
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

app.get('/registration', (req, res) => {
    res.render("registration.ejs")
})

app.get('/login', (req, res) => {
    res.render("login.ejs")
})

const alerts = {}; // Sygnały w fazie przygotowań są tymczasowe dlatego nie ma potrzeby zapisywac ich w bazie danych
const moves = {}; // -- || --
const Letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const ships = {};

io.on('connection', socket => {
    console.log('a user connected')

    socket.on('start game', ({ player, gameId }, cb) => {
        if(!moves[gameId]) {
            moves[gameId] = []
        }

        if(!ships[gameId]) {
            ships[gameId] = {}
        }

        if(!ships[gameId][player]) {
            ships[gameId][player] = []
        }

        socket.join(gameId)

        cb(moves[gameId], ships[gameId][player])
    })

    socket.on('move', ({ player, move, gameId }, cb) => {
        const [ x, y ] = move
        const letter = Letters[x]
        const message = `${player}: ${letter}${y}`

        moves[gameId].push(message)
        io.to(gameId).emit('message', message)

        cb()
    })

    socket.on('hit', ({ gameId }) => {
        const message = "Hit!"
        moves[gameId].push(message)
        io.to(gameId).emit('message', message)
    })

    socket.on('sink', ({ gameId, player, shipsSinked }) => {
        const message = "Hit & Sink!"
        moves[gameId].push(message)
        ships[gameId][player] = shipsSinked
        io.to(gameId).emit('message', message)
    })

    socket.on('miss', ({ gameId }) => {
        io.to(gameId).except(socket.id).emit('your turn')
    })

    socket.on('winner', ({ gameId, winner }) => {
        io.to(gameId).emit('win', winner)
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