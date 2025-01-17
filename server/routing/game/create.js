const db = require("../../db")
const Game = require("../../objects/Game.js")
const Player = require("../../objects/Player.js")
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
    const creator = jwt.verify(req.cookies.accessToken, process.env.ACCESS_TOKEN_SECRET).nickname;
    const gameName = req.body.gameName

    if (!creator || !gameName) {
        res.status(400).json({ error: "Creator's and game's name are needed!" });
        return;
    }

    let game = new Game(gameName, {
        [creator]: new Player(creator),
    })

    try {
        db.push("/games[]", game, true)
        console.log(`${creator} has created a game.`)
        res.redirect(`/game/${game.id}/prep`)
    } catch (error) {
        console.error("Error saving game to DB: ", error)
        return res.status(500).json({ error: "Failed to save game to DB" });
    }
};