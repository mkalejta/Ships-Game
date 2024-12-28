db = require("../../db")

module.exports = (req, res) => {
    const move = req.body.move
    const player = req.query.player

    if (!move || !player) {
        res.status(400).json({ error: "Move and player have to be given!" })
        return;
    }

    const data = db.getData("/games")
    const game = data.find(g => g.id === req.params.id)

    if (!game) {
        res.status(404).json({ error: "Game was not found with given id! "})
        return;
    }

    game.players[player].boards["opponent"].make_move(move)

    for(let i=0; i < data.length; i++) {
        if (data[i].id === req.params.id) {
            data[i] = game
            console.log(`${player}: ${move}`)
        }
    }

    db.push("/games", data) // Aktualizacja bazy danych o polu 'games'
    return;
}