const db = require("../../db")
import Game from "../../objects/Game"
import Player from "../../objects/Player"

module.exports = (req, res) => {
    const creator = req.query.creator
    const gameName = req.query.name
    if (!creator || !gameName) {
        res.status(400).json({ error: "Creator's and game's name are needed!" })
        return;
    }
    let game = new Game(gameName, {
        [creator]: new Player(creator),
    })
    console.log(`${creator} has created a game.`)
    db.push("/games[]", game, true)
    res.status(200).json(game)
}