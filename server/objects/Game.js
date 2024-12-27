const { v4: uuidv4 } = require('uuid');
import Board from './Board.js';
import Ship from './Ship.js';
import Player from './Player.js';

export default class Game {

    constructor(name, players) {
        this.id = uuidv4()
        this.name = name
        this.board = new Board(this.id)
        this.players = players // [Player Object 1, ]
        this.ships = null
        this.winner = null
        this.time = new Date().toLocaleString()
    }

    // funkcja joinGame()

    // funkcja ifWinner()

    // funkcja ifHit()

    // funkcja ifSink()
}