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
        Object.entries(this.players).forEach(([nick, player]) => {
            const board = player.boards["self"];
            if (board.ifAllSink()) {
                this.winner = nick;
                console.log(`${nick} won the game!`);
                return true;
            }
        });
    }
}