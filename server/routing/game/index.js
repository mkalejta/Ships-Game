const db = require("../../db")

module.exports = async (req, res) => {
    const data = await db.getData("/games");

    if (!req.params.id) {
        res.status(200).json(data) // Zwracane dane 'data' to lista wszystkich gier
        return;
    }

    const game = data.find(g => g.id === req.params.id)
    if (!game) {
        res.status(404).json({ error: "Game was not found with given id! "})
        return;
    }
    res.status(200).json(game)
}