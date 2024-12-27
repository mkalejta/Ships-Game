db = require("../../db")

module.exports = (req, res) => {
    const move = req.body.move

    if (!move) {
        res.status(400).json({ error: "There was not given any move!" })
        return;
    }

    const data = db.getData("/games")
    const game = data.find(g => g.id === req.params.id)

    if (!game) {
        res.status(404).json({ error: "Game was not found with given id! "})
        return;
    }

    game.players.board["opponent"].make_move(move)

    for(let i=0; i < data.length; i++) {
        if (data[i].id === req.params.id) {
            data[i] = game
            console.log(`${player}: ${move}`)
        }
    }

    db.push("/games", data) // Aktualizacja bazy danych o polu 'games'
    return;
}