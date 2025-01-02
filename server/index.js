const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routing = require("./routing");
const app = express();
const PORT = 3000;
const viewsPath = path.join(__dirname, "../client/views");

app.use(express.static(path.join(__dirname, "../client")));

app.use(bodyParser.json());

app.use("/api", routing);

// Domyślna trasa
app.get('/', (req, res) => {
    res.sendFile(path.join(viewsPath, "home.html"))
});

app.get('/game', (req, res) => {
    res.sendFile(path.join(viewsPath, "games.html"))
})

app.get('/game/:id', (req, res) => {
    res.sendFile(path.join(viewsPath, "game.html"))
})

app.post('/game/:id', (req, res) => {
    res.redirect(path.join(viewsPath, "prep.html"))
})

app.put('/game/:id', (req, res) => {
    res.redirect(path.join(viewsPath, "prep.html"))
})

app.post('/game/:id/prep', (req, res) => {
    res.redirect(path.join(viewsPath, "game.html"))
})

app.listen(PORT, () => {
    console.log(`Backend listens on port ${PORT}`);
});