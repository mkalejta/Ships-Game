const router = require('express').Router()
const game = require("./game")

router.use("/game", game) // http://localhost:3000/api/game

module.exports = router