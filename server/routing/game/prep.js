db = require("../../db")
const Ship = require("../../objects/Ship")
const Board = require("../../objects/Board")
const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {
    const gameId = req.params.id
    const player = jwt.verify(req.cookies.accessToken, process.env.ACCESS_TOKEN_SECRET).nickname;

    if (!gameId || !player) {
        res.status(400).json({ error: "Id and player have to be given!" })
        return;
    }

    const data = await db.getData("/games")
    let game = data.find(g => g.id === req.params.id)

    if (!game) {
        res.status(404).json({ error: "Game was not found with given id! "})
        return;
    }

    let boardObj = Object.assign(new Board(), game.players[player].boards['self']); // Zamiana danych na obiekt Board
    const opponent = getOpponent(game, player);

    switch (req.method) {
        case "PUT": // Zaznaczenie ułożenia statku
            const parts = req.body.parts.map(part => ({
                position: part,
                hit: false
            }))
            if (!parts) {
                res.status(400).json({ error: "Ship has to be given!" })
                return;
            }

            boardObj.add_ship(new Ship(parts)) // Utworzenie statków w zmiennych 'board' i 'ships'
            game.players[player].boards['self'] = boardObj; // Aktualizacja obiektu 'game'

            for (let i = 0; i < data.length; i++) {
                if (data[i].id === req.params.id) {
                    data[i] = {...game}
                    data[i].players[opponent].boards['opponent'].ships = data[i].players[player].boards['self'].ships
                    console.log(`${player} added ship with size ${parts.length}`)
                    res.status(200).json(data[i])
                }
            }
            db.push("/games", data)
            break;

        case "DELETE": // Wyczyszczenie ułożenia statków
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === req.params.id) {
                    data[i].players[player].boards["self"].ships = []
                    data[i].players[opponent].boards['opponent'].ships = []
                    console.log(`${player}'s choices are cleared!`)
                    res.status(200).json(data[i])
                }
            }
            db.push("/games", data)
            break;

        case "POST": // Zatwierdzenie ułożenia statków
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === req.params.id) {
                    data[i].players[player].ready = true
                    console.log(`${player} is ready`)
                    res.status(200).json(data[i])
                }
            }
            db.push("/games", data)
            break;
    }
}

function getOpponent(game, player) {
    let opponent = Object.keys(game.players).filter(name => name !== player)[0]
    return opponent;
}