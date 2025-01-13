
class Ship {

    constructor(parts, sink=false) {
        this.parts = parts.map(part => ({
            position: part.position,
            hit: part.hit
        }))
        this.size = this.parts.length
        this.sink = sink
    }

    ifHit(move) {
        for (let part of this.parts) {
            if (part.position[0] === move[0] && part.position[1] === move[1]) {
                part.hit = true
                this.ifSink();
                return true;
            }
        }
        return false;
    }

    ifSink() {
        if (this.parts.every(part => part.hit === true)) {
            this.sink = true;
        }
    }
}

module.exports = Ship;