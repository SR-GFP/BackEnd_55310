const {Router} = require ("express")
const router = Router()
const ProductManager = require("../Clases/ProductManager")
const productManager = new ProductManager("Products")
const products = productManager.getProducts()    

router.get("/", async (req, res)=>{
    res.render("home")
})


module.exports = router