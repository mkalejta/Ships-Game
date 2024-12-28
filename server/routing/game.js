const create = require("./game/create")
const join = require("./game/join")
const move = require("./game/move")
const prep = require("./game/prep")
const view = require("./game/")
const router = require("express").Router()

router.post("/create", create) // POST - http://localhost:3000/api/game/create?creator=Mikolaj&name=BitwaPodGdanskiem
router.put("/:id/join", join) // PUT - http://localhost:3000/api/game/:gameId/join?joiner=Alek
router.put("/:id", move) // PUT - http://localhost:3000/api/game/:gameId?player=Mikolaj   BODY = { move: {x: 3, y: 5} }
router.get("/:id", view) // GET - http://localhost:3000/api/game/:gameId
router.get("/", view) // GET - http://localhost:3000/api/game
router.put("/:id/prep", prep) // PUT - http://localhost:3000/api/game/:gameId/prep?player=Mikolaj   BODY = { ship: new Ship() }
router.delete("/:id/prep", prep) // DELETE - http://localhost:3000/api/game/:gameId/prep?player=Mikolaj
router.post("/:id/prep", prep) // POST - http://localhost:3000/api/game/:gameId/prep?player=Mikolaj

module.exports = router