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
    const opponent = getOpponent(game, player)

    if (!game) {
        res.status(404).json({ error: "Game was not found with given id! "})
        return;
    }
    
    let boardObj = Object.assign(new Board(), game.players[player].boards['opponent']); // Zamiana danych na obiekt Board
    boardObj.ships = boardObj.ships.map(ship => new Ship(ship.parts, ship.sink)); // Zamiana danych na obiekty Ship

    boardObj.make_move(move); // Wykonanie ruchu

    game.players[player].boards['opponent'] = boardObj; // Aktualizacja obiektu 'game'

    let j;
    for(let i=0; i < data.length; i++) {
        if (data[i].id === req.params.id) {
            data[i] = { ...game }
            data[i].players[opponent].boards['self'] = data[i].players[player].boards['opponent']
            console.log(`${player}: ${move[0]} ${move[1]}`)
            j = i
            break;
        }
    }

    try {
        await db.push("/games", data) // Aktualizacja bazy danych o polu 'games'
        return res.status(200).json(data[j])
    } catch (error) {
        console.error("Error saving game to DB: ", error)
        return res.status(500).json({ error: "Failed to save game to DB" });
    }
}

function getOpponent(game, player) {
    let opponent = Object.keys(game.players).filter(name => name !== player)[0]
    return opponent;
}