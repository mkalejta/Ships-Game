
class Ship {

    constructor(parts) {
        this.parts = parts.map(part => ({
            position: part,
            hit: false
        }))
        this.size = this.parts.length
        this.sink = false
    }

    ifHit(move) {
        let hit = false;
        this.parts.forEach((part, i) => {
            if (part.position[0] === move[0] && part.position[1] === move[1]) {
                this.parts[i].hit = true;
                hit = true;
                this.ifSink();
            }
        });
        return hit;
    }

    ifSink() {
        if (this.parts.every(part => part.hit === true)) {
            this.sink = true;
        }
    }
}

module.exports = Ship;