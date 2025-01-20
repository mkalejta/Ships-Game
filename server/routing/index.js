const express = require('express')
const router = express.Router()
const game = require("./game")
const registration = require('./registration')
const login = require('./login')
const logout = require('./logout')

router.use("/game", game) // http://localhost:3000/api/game
router.post("/registration", registration) // http://localhost:3000/api/registration
router.post("/login", login) // http://localhost:3000/api/login
router.post("/logout", logout) // http://localhost:3000/api/logout

module.exports = router