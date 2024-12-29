
class Ship {

    constructor(size, parts) {
        this.size = size
        this.parts = [];
        if (parts) {
            this.build_ship(parts);
        }
        this.sink = false
    }

    build_ship(parts) {
        parts.forEach(part => {
            this.parts.push(new ShipPart(part.x, part.y))
        });
    }

    ifHit(move) {
        for (let part in this.parts) {
            if (part.ifHit(move)) {
                console.log('Ship was hit!')
                ifSink();
                return true;
            }
        }
        return false;
    }

    ifSink() {
        for (let part in this.parts) {
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
    
    constructor(x, y, data) {
        this.x = x
        this.y = y
        this.hit = false
        if (data) {
            Object.assign(this, data);
        }
    }

    ifHit(move) {
        if (this.x === move.x && this.y === move.y) {
            this.hit = true
            return true;
        }
        return false;
    }
}

module.exports = { Ship, ShipPart }