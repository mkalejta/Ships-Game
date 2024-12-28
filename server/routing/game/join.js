const db = require("../../db")
import Player from "../../objects/Player"

module.exports = (req, res) => {
    const joiner = req.query.joiner

    if (!joiner) {
        res.status(400).json({ error: "Joiner's name is needed!" })
        return;
    }

    let data = db.getData("/games")
    const game = data.find(g => g.id === req.params.id)

    if (!game) {
        res.status(404).json({ error: "Game was not found with that id" })
        return;
    }

    if (game.players.length === 1) {
        for (let i=0; i < data.length; i++) {
            if (data[i].id === req.params.id) {
                data[i].players[joiner] = new Player(joiner)
                data[i].time = new Date().toLocaleString()
                console.log(`${joiner} has joined a game ${data[i].name}`)
                res.status(200).json(data[i])
            }
        }
        db.push("/games", data) // Aktualizacja bazy danych o polu 'games'
        return;
    } else {
        res.status(400).json({ error: "Game is already full of players!" })
        return;
    }
}