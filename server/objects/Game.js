const { v4: uuidv4 } = require('uuid');
import Board from board;

class Game {

    constructor(board, players) {
        this.id = uuidv4()
        this.board = {}
        this.players = []
        this.ships = null
        this.winner = null
    }
}