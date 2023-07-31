const express = require ("express");
const app = express();
const router = require("./routes")

app.use(express.json())
router(app)

module.exports = app