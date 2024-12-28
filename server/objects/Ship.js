
export default class Ship {

    constructor(size, parts) {
        this.size = size
        this.parts = parts
        this.sink = false
    }

    ifHit(move) {
        for (part in this.parts) {
            if (part.ifHit(move)) {
                console.log('Ship was hit')
                part.hit = true
                ifSink();
                return true;
            }
        }
        return false;
    }

    ifSink() {
        for (part in this.parts) {
            if (part.hit === false) {
                return false;
            }
        }
        console.log('Ship was sinked!')
        this.sink = true
        return true;
    }
}

class ShipPart {
    
    constructor(x, y) {
        this.x = x
        this.y = y
        this.hit = false
    }

    ifHit(move) {
        return this.x === move[0] && this.y === move[1];
    }
}