const homeController = require("../Controllers/controller.home")
const cartsController = require("../Controllers/controller.carts")
const productsController = require("../Controllers/controller.productos")

const router = app =>{
app.use("/", homeController)
app.use("/carts", cartsController)
app.use("/products", productsController)
}

module.exports = router