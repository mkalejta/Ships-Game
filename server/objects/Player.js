import Board from "./Board.js";

export default class Player {
    
    constructor(nickname) {
        this.nickname = nickname;
        this.boards = {
            'self': new Board(),
            'opponent': new Board()
        };
    }
}