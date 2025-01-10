const { JsonDB, Config } = require("node-json-db");
var db = new JsonDB(new Config("./database.json", true, true));
module.exports = db