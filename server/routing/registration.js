const db = require("../db")
const User = require('../objects/User.js')
const bcrypt = require('bcrypt');
const saltRounds = 10;


module.exports = async (req, res) => {
    const nickname = req.body.nickname;
    const password = req.body.password;

    if (!nickname || !password) {
        res.status(400).json({ error: "Nickname and password are needed!"})
        return;
    }

    const data = await db.getData("/users");

    if(data.map(player => player.nickname).includes(nickname)){
        res.status(409).json({ error: "Player with given nickname already exists in database!" })
        return;
    }

    let user = new User(nickname, password);
    const hashedPassword = await hashPassword(user.password)
    user.password = hashedPassword

    try {
        db.push("/users[]", user, true)
        console.log(`${user.nickname} registered successfully.`)
        res.redirect(`/login`)
    } catch (error) {
        console.error("Error saving game to DB: ", error)
        return res.status(500).json({ error: "Failed to save game to DB" });
    }
}

async function hashPassword(password) {
    try {
        return await bcrypt.hash(password, saltRounds);
    } catch (err) {
        throw new Error('Unable to hash password');
    }
}