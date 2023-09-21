const express = require ("express")
const handlebars = require("express-handlebars")
const router = require("./Router/index.router")
const mongoConnect = require("./db/index.db")
const cookieParser = require("cookie-parser")
const sessionDb = require ("./db/sessions.js")
const initializePassport = require("./config/passport.conifg")
const passport = require("passport")

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))
app.use(cookieParser())


app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars" )

sessionDb(app)
initializePassport()
app.use(passport.initialize())
app.use(passport.session())
router(app)
mongoConnect()

module.exports = app