const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const routing = require("./routing");
const middleware = require("./routing/middleware");
const app = express();
const { Server } = require('socket.io');
const PORT = 3000;
const { instrument } = require("@socket.io/admin-ui");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const mqttClient = require('./mqttConfig');
const ranking = require('./ranking');
const login = require('./routing/login.js');
const db = require('./db.js');
require("dotenv").config();


const expressServer = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
});
const io = new Server(expressServer, {
    cors: {
        origin: ["https://admin.socket.io", "*"],
        credentials: true,
    },
});
instrument(io, {
    auth: false
});

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));


// Ustawienia widoków
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../client/views"));

app.use(express.static(path.join(__dirname, "../client/public")));

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routing);
app.use(middleware);


const endGameTopic = "endGame";
mqttClient.subscribe(endGameTopic, () => {
    console.log(`Zasubksrybowano endGame`)
})

mqttClient.on("message", (topic, message) => {
    const [ winner, selfSinkedShips ] = message.toString().split('/');

    if (topic === endGameTopic) {
        mqttClient.publish("ranking", message)
        mqttClient.publish("winner", winner)
    }
})


// Generowanie widoków
app.get('/', (req, res) => {
    res.render("home.ejs");
});

app.get('/game', async (req, res) => {
    const player = req.user;
    const games = await db.getData('/games');
    res.render("games.ejs", { player, games: games });
})

app.get('/game/:id', (req, res) => {
    const player = req.user;
    res.render("game.ejs", { player });
})

app.get('/game/:id/prep', (req, res) => {
    const player = req.user;
    res.render("prep.ejs", { player });
})

app.get('/registration', (req, res) => {
    res.render("registration.ejs")
})

app.get('/login', (req, res) => {
    res.render("login.ejs")
})

app.get('/ranking', async (req, res) => {
    const data = await db.getData('/users');
    const sortRanking = (array) => array.sort((a, b) => {
        const [nameA, rankingA] = Object.entries(a)[0];
        const [nameB, rankingB] = Object.entries(b)[0];

        if (rankingA !== rankingB) {
            return rankingB - rankingA;
        }

        return nameA.localeCompare(nameB);
    });

    const ranking = sortRanking(data.map((user) => ({[user.nickname]: user.ranking})));
    res.render("ranking.ejs", { ranking })
})

app.get('/instructions', (req, res) => {
    res.render("instructions.ejs")
})

app.get('*', function(req, res){
    res.render("login.ejs");
});

const alerts = {}; // Sygnały w fazie przygotowań są tymczasowe dlatego nie ma potrzeby zapisywac ich w bazie danych
const moves = {}; // -- || --
const Letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

io.on('connection', socket => {
    console.log('a user connected')

    socket.on('start game', ({ gameId }, cb) => {
        if(!moves[gameId]) {
            moves[gameId] = []
        }

        socket.join(gameId)

        cb(moves[gameId])
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

    socket.on('sink', ({ gameId }) => {
        const message = "Hit & Sink!"
        moves[gameId].push(message)
        io.to(gameId).emit('message', message)
    })

    socket.on('miss', ({ gameId }) => {
        io.to(gameId).except(socket.id).emit('your turn')
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

        cb(alerts[gameId])
    })
});