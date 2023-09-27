const { Router } = require ("express")
const router = Router()
const Products = require("../DAOs/Models/products.model")

router.get("/", (req, res)=>{  
    res.render("realTimeProducts")
})

module.exports = router