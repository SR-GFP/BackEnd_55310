const express = require("express")
const app = express()
const handlebars = require("express-handlebars");
const router = require("./Router");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/Public"))


app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

router(app)

module.exports = app;