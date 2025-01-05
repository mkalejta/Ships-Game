const db = require("../../db")
const Game = require("../../objects/Game.js")
const Player = require("../../objects/Player.js")

module.exports = (req, res) => {
    const creator = req.body.creator
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
        res.redirect(`/game/${game.id}/prep?player=${creator}`)
    } catch (error) {
        console.error("Error saving game to DB: ", error)
        return res.status(500).json({ error: "Failed to save game to DB" });
    }
};