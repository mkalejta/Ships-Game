const db = require("../db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    try {
        const nickname = req.body.nickname;
        const password = req.body.password;
    
        if (!nickname || !password) {
            return res.status(400).json({ error: "Nickname and password are needed!"})
        }
    
        const users = await db.getData("/users")
        const user = users.find(u => u.nickname === nickname)
    
        if (!user) {
            return res.status(404).json({ error: "User not found!" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if(!isPasswordCorrect) {
            return res.status(400).json({ error: 'wrong password' })
        }

        const accessToken = jwt.sign({ nickname }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        res.cookie('accessToken', accessToken, { httpOnly: true })
        res.status(200).json({ message: "Successfully logged in" })
        
    } catch (err) {
        return res.status(500).json(err.message);
    }
}