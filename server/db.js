const { JsonDB, Config } = require("node-json-db");
var db = new JsonDB(new Config("./database.json"));
module.exports = db