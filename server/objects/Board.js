const { v4: uuidv4 } = require('uuid');
const { Ship, ShipPart } = require('./Ship.js');


const SIZE = 10;

module.exports = class Board {

    /*
        OZNACZENIA NA PLANSZY
        '0' - pudło
        '1' - niesprawdzone
        '2-5' - rodzaj statku
    */
    
    constructor() {
        this.id = uuidv4()
        this.size = SIZE
        this.board = this.build_board()
        this.ships = []
    }
    
    build_board() {
        let board = []
        for (let i = 0; i < this.size; i++) {
            board.push(Array(SIZE).fill('1'))
        }
        return board;
    }

    make_move(move) {
        if (!move) {
            return;
        }

        this.ships.forEach(ship => {
            if (ship.ifHit(move)) {
                return;
            }
        })

        this.board[move[0]][move[1]] = "0"
    }

    ifAllSink() {
        this.ships.forEach(ship => {
            if (!ship.sink) {
                return false;
            }
        })
        return true;
    }
};
