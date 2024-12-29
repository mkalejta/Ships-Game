db = require("../../db")
const Board = require("../../objects/Board.js")
const { Ship, ShipPart } = require("../../objects/Ship.js")

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

    game.players[player].boards['opponent'] = Object.assign(new Board(), game.players[player].boards['opponent']);
    game.players[player].boards['opponent'].ships = game.players[player].boards['opponent'].ships.map(ship => ship = Object.assign(new Ship(), ship));
    game.players[player].boards['opponent'].ships.forEach(ship => {
        ship.parts.map(part => part = Object.assign(new ShipPart(), part));
    });
    game.players[player].boards['opponent'].make_move(move);

    for(let i=0; i < data.length; i++) {
        if (data[i].id === req.params.id) {
            data[i] = game
            console.log(`${player}: ${move.x} ${move.y}`)
            res.status(200).json(data[i])
        }
    }

    db.push("/games", data) // Aktualizacja bazy danych o polu 'games'
    return;
}