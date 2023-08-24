const { Router } = require("express")
const Products = require("../models/products")
const router = Router()



router.get("/", async (req, res)=>{
  try {
    const products = await Products.find({status:true})
    res.json({message: products})
  } catch (error) {
    res.status(500).json({ error: "error al obtener los productos" });
  }  
})

router.get("/:id", async (req, res)=>{
  try {
    const { id } = req.params;
    const getProductById = await Products.find({_id: id})
    res.json({message: getProductById})
  } catch (error) {
    res.status(500).json({ error: "error al obtener el producto" });
  }
})
router.post("/", async (req, res)=>{
  try {
    const { title, description, code, price, status, stock, thumbnails } = req.body
    const productInfo = {
      title,
      description,
      code,
      price,
      status,
      stock,
      thumbnails,
    }
    const newProduct = await Products.create(productInfo)
  } catch (error) {
    res.status(400).json({ error: "Error al crear el producto." });
  }
})

module.exports = router