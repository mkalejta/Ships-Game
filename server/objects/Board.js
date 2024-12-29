const { v4: uuidv4 } = require('uuid');
const { Ship, ShipPart } = require('./Ship.js');


const SIZE = 10;

class Board {

    /*
        OZNACZENIA NA PLANSZY
        '0' - pudło
        '1' - niesprawdzone
        '2-5' - rodzaj statku
    */
    
    constructor(data) {
        this.id = uuidv4()
        this.size = SIZE
        this.board = this.build_board()
        this.ships = []
        if (data) {
            Object.assign(this, data);
        }
    }
    
    build_board() {
        let board = []
        for (let i = 0; i < this.size; i++) {
            board.push(Array(SIZE).fill('1'))
        }
        return board;
    }

    make_move(move) {
        this.ships.forEach(ship => {
            if (ship.ifHit(move)) {
                this.board[move.x][move.y] = String(ship.size)
                return;
            }
        })

        this.board[move.x][move.y] = "0"
        console.log("Miss...")
        return;
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

module.exports = Board