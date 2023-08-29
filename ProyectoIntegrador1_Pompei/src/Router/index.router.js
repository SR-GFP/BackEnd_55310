const homeController = require("../Controllers/controller.home")
const cartsController = require("../Controllers/controller.carts")
const productsController = require("../Controllers/controller.productos")
const realTimeProductsController = require("../Controllers/controller.realTimeProducts")
const chatController = require ("../Controllers/controller.chat")

const router = app =>{
app.use("/", homeController)
app.use("/api/products", productsController)
app.use("/api/carts", cartsController)
app.use("/realtimeproducts", realTimeProductsController)
app.use("/chat", chatController)
}

module.exports = router