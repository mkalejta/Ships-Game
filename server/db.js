const { JsonDB } = require("node-json-db")
let db = new JsonDB("./database.json")

module.exports = db