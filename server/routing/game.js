const create = require("./create")
const join = require("./game/join")
const move = require("./game/move")
const prep = require("./game/prep")
const view = require("./game/")
const router = require("express").Router()

router.put("/:id/join", join) // PUT - http://localhost:3000/api/game/:gameId/join
router.put("/:id", move) // PUT - http://localhost:3000/api/game/:gameId?player=Mikolaj   BODY = { move: [3, 5] }
router.get("/:id", view) // GET - http://localhost:3000/api/game/:gameId
router.post("/", create) // POST - http://localhost:3000/api/game
router.get("/", view) // GET - http://localhost:3000/api/game
router.put("/:id/prep", prep) // PUT - http://localhost:3000/api/game/:gameId/prep?player=Mikolaj   BODY = { ship: ... }
router.delete("/:id/prep", prep) // DELETE - http://localhost:3000/api/game/:gameId/prep?player=Mikolaj
router.post("/:id/prep", prep) // POST - http://localhost:3000/api/game/:gameId/prep?player=Mikolaj

module.exports = router