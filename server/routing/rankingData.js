const db = require('../db.js');

module.exports = async (req, res) => {
    const users = await db.getData("/users")
    const data = sortRanking(users.map((user) => ({[user.nickname]: user.ranking})))
    return res.status(200).json(data)
}

const sortRanking = (array) => array.sort((a, b) => {
    const [nameA, rankingA] = Object.entries(a)[0];
    const [nameB, rankingB] = Object.entries(b)[0];

    if (rankingA !== rankingB) {
        return rankingB - rankingA;
    }

    return nameA.localeCompare(nameB);
});