const { v4: uuidv4 } = require('uuid');

module.exports = class Game {

    constructor(name, players) {
        this.id = uuidv4()
        this.name = name
        this.players = players // { playerName: Player Object 1, }
        this.winner = null
        this.time = new Date().toLocaleString()
    }

    ifWinner() {
        this.players.reduce((acc, player) => {
            acc[player.nickname] = player.boards["self"]
            return acc;
        }, {}).forEach((nick, board) => {
            if (board.ifAllSink()) {
                this.winner = nick
                console.log(`${nick} won the game!`)
                return true;
            }
        });
    }
}