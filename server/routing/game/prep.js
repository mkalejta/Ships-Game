db = require("../../db")
const Ship = require("../../objects/Ship")

module.exports = async (req, res) => {
    const gameId = req.params.id
    const player = req.query.player

    if (!gameId || !player) {
        res.status(400).json({ error: "Id and player have to be given!" })
        return;
    }

    const data = await db.getData("/games")
    const game = data.find(g => g.id === req.params.id)

    if (!game) {
        res.status(404).json({ error: "Game was not found with given id! "})
        return;
    }

    const opponent = getOpponent(game, player);

    switch (req.method) {
        case "PUT": // Zaznaczenie ułożenia statku
            const parts = req.body.parts
            if (!parts) {
                res.status(400).json({ error: "Ship has to be given!" })
                return;
            }

            for (let i = 0; i < data.length; i++) {
                if (data[i].id === req.params.id) {
                    data[i].players[player].boards["self"].ships.push(new Ship(parts))
                    data[i].players[opponent].boards['opponent'] = data[i].players[player].boards['self']
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
                    data[i].players[opponent].boards['opponent'] = data[i].players[player].boards['self']
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