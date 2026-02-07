/**
 * Seed script — initializes the database with the required structure.
 * Run once before starting the server for the first time:
 *
 *   node seed.js
 */

const db = require("./db");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const SALT_ROUNDS = 10;

const seedUsers = [
    { nickname: "Player1", password: "password1", ranking: 150 },
    { nickname: "Player2", password: "password2", ranking: 80 },
    { nickname: "Player3", password: "password3", ranking: 0 },
];

// Helper: create an empty 10x10 board filled with "1" (unchecked)
function emptyBoard() {
    return Array.from({ length: 10 }, () => Array(10).fill("1"));
}

// Helper: place ships on a board and return { board, ships }
function buildBoard(shipDefs) {
    const board = emptyBoard();
    const ships = shipDefs.map((def) => {
        const parts = def.positions.map((pos) => {
            board[pos[0]][pos[1]] = String(def.positions.length);
            return { position: [String(pos[0]), String(pos[1])], hit: def.allSunk };
        });
        return { parts, size: def.positions.length, sink: def.allSunk };
    });
    // Mark misses on the board ("0") at given coordinates
    return { board, ships };
}

function makePlayer(nickname, selfShipDefs, opponentShipDefs, ready) {
    const self = buildBoard(selfShipDefs);
    const opponent = buildBoard(opponentShipDefs);
    return {
        nickname,
        boards: {
            self: { id: uuidv4(), size: 10, board: self.board, ships: self.ships },
            opponent: { id: uuidv4(), size: 10, board: opponent.board, ships: opponent.ships },
        },
        ready,
    };
}

// --- Finished games ---

const finishedGames = [
    {
        id: uuidv4(),
        name: "Epic Battle",
        players: {
            Player1: makePlayer(
                "Player1",
                // Player1's own board — all ships sunk (they lost)
                [
                    { positions: [[0,0],[0,1],[0,2],[0,3],[0,4]], allSunk: true },
                    { positions: [[2,0],[2,1],[2,2],[2,3]],       allSunk: true },
                    { positions: [[4,0],[4,1],[4,2]],             allSunk: true },
                    { positions: [[6,0],[6,1],[6,2]],             allSunk: true },
                    { positions: [[8,0],[8,1]],                   allSunk: true },
                ],
                // Player1's view of opponent (partial hits)
                [
                    { positions: [[1,1],[1,2],[1,3],[1,4],[1,5]], allSunk: true },
                    { positions: [[3,2],[3,3],[3,4],[3,5]],       allSunk: false },
                    { positions: [[5,7],[5,8],[5,9]],             allSunk: true },
                    { positions: [[7,0],[7,1],[7,2]],             allSunk: false },
                    { positions: [[9,4],[9,5]],                   allSunk: true },
                ],
                true
            ),
            Player2: makePlayer(
                "Player2",
                // Player2's own board — some ships still alive (they won)
                [
                    { positions: [[1,1],[1,2],[1,3],[1,4],[1,5]], allSunk: true },
                    { positions: [[3,2],[3,3],[3,4],[3,5]],       allSunk: false },
                    { positions: [[5,7],[5,8],[5,9]],             allSunk: true },
                    { positions: [[7,0],[7,1],[7,2]],             allSunk: false },
                    { positions: [[9,4],[9,5]],                   allSunk: true },
                ],
                // Player2's view of opponent (all sunk)
                [
                    { positions: [[0,0],[0,1],[0,2],[0,3],[0,4]], allSunk: true },
                    { positions: [[2,0],[2,1],[2,2],[2,3]],       allSunk: true },
                    { positions: [[4,0],[4,1],[4,2]],             allSunk: true },
                    { positions: [[6,0],[6,1],[6,2]],             allSunk: true },
                    { positions: [[8,0],[8,1]],                   allSunk: true },
                ],
                true
            ),
        },
        winner: "Player2",
        time: "2/5/2026, 2:15:30 PM",
    },
    {
        id: uuidv4(),
        name: "Quick Match",
        players: {
            Player1: makePlayer(
                "Player1",
                // Player1's own board — ships still alive (they won)
                [
                    { positions: [[0,5],[1,5],[2,5],[3,5],[4,5]], allSunk: false },
                    { positions: [[0,0],[1,0],[2,0],[3,0]],       allSunk: true },
                    { positions: [[6,7],[7,7],[8,7]],             allSunk: false },
                    { positions: [[6,1],[7,1],[8,1]],             allSunk: true },
                    { positions: [[9,9],[9,8]],                   allSunk: false },
                ],
                // Player1's view of opponent (all sunk)
                [
                    { positions: [[0,0],[0,1],[0,2],[0,3],[0,4]], allSunk: true },
                    { positions: [[2,6],[3,6],[4,6],[5,6]],       allSunk: true },
                    { positions: [[4,0],[4,1],[4,2]],             allSunk: true },
                    { positions: [[7,3],[7,4],[7,5]],             allSunk: true },
                    { positions: [[9,0],[9,1]],                   allSunk: true },
                ],
                true
            ),
            Player3: makePlayer(
                "Player3",
                // Player3's own board — all sunk (they lost)
                [
                    { positions: [[0,0],[0,1],[0,2],[0,3],[0,4]], allSunk: true },
                    { positions: [[2,6],[3,6],[4,6],[5,6]],       allSunk: true },
                    { positions: [[4,0],[4,1],[4,2]],             allSunk: true },
                    { positions: [[7,3],[7,4],[7,5]],             allSunk: true },
                    { positions: [[9,0],[9,1]],                   allSunk: true },
                ],
                // Player3's view of opponent (partial)
                [
                    { positions: [[0,5],[1,5],[2,5],[3,5],[4,5]], allSunk: false },
                    { positions: [[0,0],[1,0],[2,0],[3,0]],       allSunk: true },
                    { positions: [[6,7],[7,7],[8,7]],             allSunk: false },
                    { positions: [[6,1],[7,1],[8,1]],             allSunk: true },
                    { positions: [[9,9],[9,8]],                   allSunk: false },
                ],
                true
            ),
        },
        winner: "Player1",
        time: "2/6/2026, 10:42:15 AM",
    },
    {
        id: uuidv4(),
        name: "Championship Round",
        players: {
            Player2: makePlayer(
                "Player2",
                // Player2's own board — all sunk (they lost)
                [
                    { positions: [[1,0],[1,1],[1,2],[1,3],[1,4]], allSunk: true },
                    { positions: [[3,5],[4,5],[5,5],[6,5]],       allSunk: true },
                    { positions: [[8,2],[8,3],[8,4]],             allSunk: true },
                    { positions: [[5,8],[6,8],[7,8]],             allSunk: true },
                    { positions: [[0,9],[1,9]],                   allSunk: true },
                ],
                // Player2's view of opponent (partial)
                [
                    { positions: [[0,2],[1,2],[2,2],[3,2],[4,2]], allSunk: true },
                    { positions: [[9,0],[9,1],[9,2],[9,3]],       allSunk: false },
                    { positions: [[2,7],[3,7],[4,7]],             allSunk: true },
                    { positions: [[6,0],[7,0],[8,0]],             allSunk: true },
                    { positions: [[5,4],[5,5]],                   allSunk: false },
                ],
                true
            ),
            Player3: makePlayer(
                "Player3",
                // Player3's own board — ships still alive (they won)
                [
                    { positions: [[0,2],[1,2],[2,2],[3,2],[4,2]], allSunk: true },
                    { positions: [[9,0],[9,1],[9,2],[9,3]],       allSunk: false },
                    { positions: [[2,7],[3,7],[4,7]],             allSunk: true },
                    { positions: [[6,0],[7,0],[8,0]],             allSunk: true },
                    { positions: [[5,4],[5,5]],                   allSunk: false },
                ],
                // Player3's view of opponent (all sunk)
                [
                    { positions: [[1,0],[1,1],[1,2],[1,3],[1,4]], allSunk: true },
                    { positions: [[3,5],[4,5],[5,5],[6,5]],       allSunk: true },
                    { positions: [[8,2],[8,3],[8,4]],             allSunk: true },
                    { positions: [[5,8],[6,8],[7,8]],             allSunk: true },
                    { positions: [[0,9],[1,9]],                   allSunk: true },
                ],
                true
            ),
        },
        winner: "Player3",
        time: "2/7/2026, 9:30:00 AM",
    },
];

async function seed() {
    console.log("Seeding database...");

    // Hash passwords
    const users = await Promise.all(
        seedUsers.map(async (u) => ({
            nickname: u.nickname,
            password: await bcrypt.hash(u.password, SALT_ROUNDS),
            ranking: u.ranking,
        }))
    );

    await db.push("/users", users);
    console.log(`  -> Added ${users.length} users`);

    await db.push("/games", finishedGames);
    console.log(`  -> Added ${finishedGames.length} finished games`);

    console.log("Done! Database seeded successfully.");
    console.log("\nTest accounts:");
    seedUsers.forEach((u) => {
        console.log(`  nickname: ${u.nickname}  password: ${u.password}`);
    });
    console.log("\nFinished games:");
    finishedGames.forEach((g) => {
        console.log(`  "${g.name}" — winner: ${g.winner} (${g.time})`);
    });
}

seed().catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
});
