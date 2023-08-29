const { Router } = require ("express")
const router = Router()
const Products = require("../DAOs/Models/products")

router.get("/", (req, res)=>{  
    res.render("realTimeProducts")
})

module.exports = router