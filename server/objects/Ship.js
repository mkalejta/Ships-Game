
class Ship {

    constructor(size, parts) {
        this.size = size
        this.parts = this.build_ship(parts)
        this.sink = false
    }

    build_ship(parts) {
        let ships = []
        parts.forEach(part => {
            ships.push(new ShipPart(part.x, part.y))
        });
        return ships;
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

module.exports = { Ship, ShipPart }