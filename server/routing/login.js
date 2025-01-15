const db = require("../db");
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    const nickname = req.body.nickname;
    const password = req.body.password;

    if (!nickname || !password) {
        res.status(400).json({ error: "Nickname and password are needed!"})
        return;
    }

    const users = await db.getData("/users")
    const user = await users.find(async u => u.nickname === nickname && await bcrypt.compare(password, u.password))

    if (!user) {
        res.status(404).json({ error: "User was not found!" })
        return;
    }

    user.logged = true

    for (let i = 0; i < users.length; i++) {
        if(users[i].nickname === nickname) {
            users[i] = user
            break;
        }
    }
    
    try {
        db.push('/users', users)
        console.log(`${user.nickname} has logged in.`)
        res.redirect('/')
    } catch (error) {
        console.error("Error saving game to DB: ", error)
        return res.status(500).json({ error: "Failed to save game to DB" });
    }
}