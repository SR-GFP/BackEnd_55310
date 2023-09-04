const { Router } = require("express")
const fs = require("fs")
const router = Router()
const Products = require("../DAOs/ManagersMongoDao/MongoProductsDao")
const Files = require("../DAOs/ManagerFSDao/FSFilesDao")
const { jsonUpLoader } = require("../utils/multer")
//const Products = require("../DAOs/ManagerFSDao/FSProductDao")
const FilesDao = new Files()
const ProductsDao = new Products()


router.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, } = req.query || null
    const products = await ProductsDao.getAllProducts();
    const limitedProducts = products.slice(0, limit)
    res.render("products", limitedProducts)
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

//crear productos a partir de archivo JSON
router.post("/manyProducts", jsonUpLoader.single("productsFile"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Selecciona un archivo" });
    }
    const products = await FilesDao.getProductsFromFile();
    console.log(products);

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "El archivo no contiene productos válidos" });
    }
    const newProducts = await ProductsDao.addManyProduct(products);

    if (!newProducts || newProducts.length === 0) {
      return res.status(400).json({ error: "No se pudieron crear los productos" });
    }
    res.status(201).json({ message: "Productos creados exitosamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al crear los productos." });
  }
});


router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, code, price, stock, thumbnails } = req.body
    const existingProduct = await ProductsDao.getProductById(id)
    const productInfo = {
      title: title || existingProduct.title,
      description: description || existingProduct.description,
      code: code || existingProduct.code,
      price: price || existingProduct.price,
      stock: stock || existingProduct.stock,
      thumbnails: thumbnails || existingProduct.thumbnails,
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