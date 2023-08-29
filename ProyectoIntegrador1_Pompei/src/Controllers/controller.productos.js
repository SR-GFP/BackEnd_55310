const { Router } = require("express")
const router = Router()
const Products = require("../DAOs/ManagersMongoDao/MongoProductsDao")
//const Products = require("../DAOs/ManagerFSDao/FSProductDao")
const ProductsDao = new Products()


router.get("/", async (req, res) => {
  try {
    res.render("products")
  } catch (error) {
    res.status(500).json({ error: "error al obtener los productos" });
  }
})

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productById = await ProductsDao.getProductById({ _id: id })
    res.json(productById)
  } catch (error) {
    res.status(500).json({ error: "error al obtener el producto" });
  }
})
router.post("/", async (req, res) => {
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
    const newProduct = await ProductsDao.addProduct(productInfo)
    res.status(201).json({ message: "Producto creado exitosamente", product: newProduct });
  } catch (error) {
    res.status(400).json({ error: "Error al crear el producto." });
  }
})

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, code, price, stock, thumbnails } = req.body
    const existingProduct = await ProductsDao.getProductById(id)
    const productInfo = {
      title: title || existingProduct.title,
      description: description || existingProduct.description,
      code:  code || existingProduct.code,
      price: price || existingProduct.price,
      stock: stock || existingProduct.stock,
      thumbnails: thumbnails|| existingProduct.thumbnails,
    }
    const upDateProduct = await ProductsDao.updateProduct(id, productInfo)
    res.status(201).json({ message: `Producto ${upDateProduct.title} actualizado exitosamente` });
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar el producto." });
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await ProductsDao.deleteProduct({ _id: id }, { status: false })
    res.json({ message: `"Producto ${deleteProduct.title} eliminado exitosamente"` })
  } catch (error) {
    res.status(500).json({ error: "error al eliminar el producto" });
  }
})
module.exports = router