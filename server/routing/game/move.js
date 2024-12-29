db = require("../../db")
const Board = require("../../objects/Board.js")
const Ship = require("../../objects/Ship.js")

module.exports = async (req, res) => {
    const move = req.body.move
    const player = req.query.player

    if (!move || !player) {
        res.status(400).json({ error: "Move and player have to be given!" })
        return;
    }

    const data = await db.getData("/games")
    const game = data.find(g => g.id === req.params.id)

    if (!game) {
        res.status(404).json({ error: "Game was not found with given id! "})
        return;
    }

    let boardObj = Object.assign(new Board(), game.players[player].boards['opponent']); // Zamiana danych na obiekt Board
    boardObj.ships = boardObj.ships.map(ship => ship = new Ship(ship.parts.map(part => part.position))); // Zamiana danych na obiekty Ship

    boardObj.make_move(move); // Wykonanie ruchu
    game.players[player].boards['opponent'] = boardObj; // Aktualizacja obiektu 'game'

    for(let i=0; i < data.length; i++) {
        if (data[i].id === req.params.id) {
            data[i] = game
            console.log(`${player}: ${move[0]} ${move[1]}`)
            res.status(200).json(data[i])
        }
    }

    db.push("/games", data) // Aktualizacja bazy danych o polu 'games'
    return;
}