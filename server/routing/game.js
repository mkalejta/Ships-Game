const create = require("./game/create")
const join = require("./game/join")
const move = require("./game/move")
const prep = require("./game/prep")
const view = require("./game/")
const router = require("express").Router()

router.post("/create", create) // POST - http://localhost:3000/game/create
router.put("/:id/join", join) // PUT - http://localhost:3000/game/<game_id>/join
router.put("/:id", move) // PUT - http://localhost:3000/game/<game_id>?move=""
router.get("/:id", view) // GET - http://localhost:3000/game/<game_id>
router.get("/", view) // GET - http://localhost:3000/game
router.put("/:id/prep", prep) // PUT - http://localhost:3000/game/<game_id>/prep
router.delete("/:id/prep", prep) // DELETE - http://localhost:3000/game/<game_id>/prep
router.post("/:id/prep", prep) // POST - http://localhost:3000/game/<game_id>/prep

module.exports = router