const homeController = require ("../Controllers/controller.home")
const productsController = require ("../Controllers/controller.products")
const cartsController = require ("../Controllers/controller.carts")

const router = app =>{
    app.use("/", homeController)
    app.use("/api/products", productsController)
    app.use("/api/carts", cartsController)
    app.use("/realtimeproducts", realtimesproducts)
}
module.exports = router