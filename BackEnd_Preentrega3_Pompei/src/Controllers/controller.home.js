const { Router } = require("express")
const router = Router()
const Products = require("../DAOs/ManagersMongoDao/MongoProductsDao")
const ProductsDao = new Products()


router.get("/", (req, res)=>{
  res.render("home")
})

router.get("/products", async (req, res) => {
  try {
    const products = await ProductsDao.getAllProducts ({ status: true })
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: "error al obtener los productos" });
  }
})

module.exports = router