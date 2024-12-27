const SIZE = 10;
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

export default class Board {
    
    constructor(id) {
        this.id = id
        this.size = SIZE
        this.board = this.build_board()
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
};