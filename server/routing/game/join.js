const db = require("../../db")
const Player = require("../../objects/Player")

module.exports = async (req, res) => {
    const joiner = req.query.joiner

    if (!joiner || joiner === 'null') {
        res.status(400).json({ error: "Joiner's name is needed!" })
        return;
    }

    let data = await db.getData("/games")
    const game = data.find(g => g.id === req.params.id)

    if (!game) {
        res.status(404).json({ error: "Game was not found with that id" })
        return;
    }

    if (Object.keys(game.players).length === 1) {
        for (let i=0; i < data.length; i++) {
            if (data[i].id === req.params.id) {
                data[i].players[joiner] = new Player(joiner)
                data[i].time = new Date().toLocaleString()
                console.log(`${joiner} has joined a game ${data[i].name}`)
            }
        }
        try {
            db.push("/games", data) // Aktualizacja bazy danych o polu 'games'
            res.redirect(`/game/${game.id}/prep?player=${joiner}`)
        } catch (error) {
            console.error("Error saving game to DB: ", error)
            return res.status(500).json({ error: "Failed to save game to DB" });
        }
    } else {
        res.status(400).json({ error: "Game is already full of players!" })
        return;
    }
}