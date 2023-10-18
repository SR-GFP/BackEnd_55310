const { Router } = require ("express");
const router = Router()
const Products = require ("../DAOs/ManagersMongoDao/MongoProductsDao")
const ProductsDao = new Products()
const Carts = require ("../DAOs/ManagersMongoDao/MongoCartsDao")
const CartsDao = new Carts()

router.get("/", async (req, res)=>{
  try {
    const carts = await CartsDao.getAllCarts()
    res.render("carts")    
  } catch (error) {
    console.log(error);
  }
})

router.delete("/:cid/products/:pid", async (req,res)=>{
try {
  const {cid, pid} = req.params
  const product = await ProductsDao.getProductById(pid)
  const deleteProduct = await ProductsDao.deleteProduct(product)
} catch (error) {
  console.log(error);
}
})

module.exports = router