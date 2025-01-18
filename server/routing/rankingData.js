const db = require('../db.js');

module.exports = async (req, res) => {
    const data = await db.getData("/ranking")

    return res.status(200).json(data)
}