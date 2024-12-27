const db = require("../../db")
import Game from "../../objects/Game"
import Player from "../../objects/Player"

module.exports = (req, res) => {
    const creator = req.query.creator // http://localhost:3000/api/game/create?creator=MIKOLAJ
    const gameName = req.query.name // http://localhost:3000/api/game/create?name=BitwaPodGdanskiem
    if (!creator || !gameName) {
        res.status(400).json({ error: "Creator's and game's name are needed!" })
        return;
    }
    let game = new Game(gameName, [new Player(creator), ])
    console.log(`${creator} has created a game.`)
    db.push("/games[]", game, true)
    res.status(200).json(game)
}