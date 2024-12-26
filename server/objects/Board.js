import { v4 as uuidv4 } from 'uuid';
import Ship from './Ship.js';

const SIZE = 10;

class Board {
    
    constructor() {
        this.id = uuidv4()
        this.size = SIZE
        this.board = this.build_board()
    }
    
    build_board() {
        let board = []
        const row = [...Array(SIZE).keys()].map(_ => null)
        for(let i = 0; i < this.size; i++) {
            board[i] = row
        }
        return board;
    }
}

const newBoard = new Board();
console.log(newBoard.board);