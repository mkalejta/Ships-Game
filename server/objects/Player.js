const Board = require('./Board.js')

module.exports = class Player {
    
    constructor(nickname) {
        this.nickname = nickname
        this.boards = {
            'self': new Board(),
            'opponent': new Board()
        }
        this.ready = false
    }
}