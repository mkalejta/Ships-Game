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


io.on('connection', socket => {
    console.log('a user connected')

    socket.on('move', move => {
        console.log(move)
        io.emit('message', move)
    })

    socket.on('join game', ({ player, gameId }, cb) => {
        if(!alerts[gameId]) {
            alerts[gameId] = []
        }

        socket.join(gameId)
        const alert = `${player} has joined game`

        if (!alerts[gameId].includes(alert)) {
            alerts[gameId].push(alert)
            socket.to(gameId).emit('add alert', alert)
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
            socket.to(gameId).emit('add alert', alert)
        }

        socket.to(gameId).emit('start game')
        
        cb(alerts[gameId])
    })
});