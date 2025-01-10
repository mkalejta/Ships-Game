const { v4: uuidv4 } = require('uuid');

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

    add_ship(ship) {
        for (let part of ship) {
            this.board[part.position[0]][part.position[1]] = String(ship.size);
        }
    }

    make_move(move) {
        for (let ship of this.ships) {
            if (ship.ifHit(move)) {
                this.board[move[0]][move[1]] = String(ship.size)
                if (ship.sink) {
                    console.log('Hit and Sink')
                } else {
                    console.log('Hit!')
                }
                return;
            }
        }
        this.board[move[0]][move[1]] = "0"
        console.log("Miss...");
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