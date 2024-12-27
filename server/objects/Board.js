const { v4: uuidv4 } = require('uuid');

const SIZE = 10;
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

export default class Board {
    
    constructor() {
        this.id = uuidv4()
        this.size = SIZE
        this.board = this.build_board()
        this.ships = []
    }
    
    build_board() {
        let board = []
        LETTERS.forEach(letter => {
            let row = [];
            for (let i = 0; i < this.size; i++) {
               row.push(letter + String(i+1));
            }
            board.push(row);
        })
        return board;
    }

    add_ships(ships) {
        // Po fazie przygotowań przekazuje statki na planszę
    }

    make_move(move) {
        if (!move) {
            return;
        }

        this.ships.forEach(ship => {
            ship.ifHit(move)
            ship.ifSink(move)
        })
    }
};
