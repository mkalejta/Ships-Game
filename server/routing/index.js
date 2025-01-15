const express = require('express')
const router = express.Router()
const game = require("./game")
const registration = require('./registration')
const login = require('./login')

router.use("/game", game) // http://localhost:3000/api/game
router.post("/registration", registration) // http://localhost:3000/api/registration
router.put("/login", login) // http://localhost:3000/api/login

module.exports = router