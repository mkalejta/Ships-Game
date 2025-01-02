const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routing = require("./routing");
const app = express();
const PORT = 3000;

// Ustawienia widoków
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../client/views"));

app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.json());

app.use("/api", routing);

app.get('/', (req, res) => {
    res.render("home.ejs");
});

app.get('/game', (req, res) => {
    res.render("games.ejs");
})

app.get('/game/create', (req, res) => {
    res.render("createGame.ejs");
})

app.get('/game/:id', (req, res) => {
    res.render("game.ejs");
})

app.get('/game/:id/prep', (req, res) => {
    res.render("prep.ejs");
})



app.use(express.static(path.join(__dirname, "../client/public")));

app.listen(PORT, () => {
    console.log(`Backend listens on port ${PORT}`);
});