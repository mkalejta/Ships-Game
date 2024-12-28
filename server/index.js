const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const routing = require("./routing")
const app = express()
const PORT = 3000

app.use(express.static(path.join(__dirname, "../client")))

app.use(bodyParser.json())

app.use("/api", routing)

app.listen(PORT, () => {
    console.log(`Backend listens on port ${PORT}`)
})