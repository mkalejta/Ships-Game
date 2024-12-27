const { v4: uuidv4 } = require('uuid');
import Player from './Player.js';

export default class Game {

    constructor(name, players) {
        this.id = uuidv4()
        this.name = name
        this.players = players // [Player Object 1, ]
        this.winner = null
        this.time = new Date().toLocaleString()
    }

    // funkcja ifWinner()
}