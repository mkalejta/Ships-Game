const { JsonDB, Config } = require("node-json-db");
const path = require("path");
const fs = require("fs");

const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

var db = new JsonDB(new Config(path.join(dataDir, "database.json"), true, true));
module.exports = db;