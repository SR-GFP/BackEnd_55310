const { Router } = require("express");
const router = Router();
const ProductManager = require("../Clases/ProductManager");
const productManager = new ProductManager("Products");

router.get("/", async (req, res) => {
  try {
    const { limit } = req.query || null;
    const products = await productManager.getProducts();
    const limitedProducts = products.slice(0, limit);
    return !limit ? res.json(products) : res.json(limitedProducts)
  } catch (error) {
    res.status(500).json({ error: "error al obtener los productos" });
  }
})

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(Number(pid));
    if (product === null) {
      res.status(404).json({ error: "Producto no encontrado." });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ error: "error al obtener el producto" });
  }
})

router.post("/", async (req,res)=>{
try {
    const { 
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails} = req.body;
        const newProduct =  await productManager.addProducts(
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails);
        res.json(newProduct);
} catch (error) {
  res.status(400).json({ error: "Error al crear el producto." })
}
})

router.put("/:pid", async (req,res)=>{
    try {
        const { pid }  = req.params;
        const updateField = req.body;        
        const produtcUpdate = await productManager.updateProduct(Number(pid), updateField);        
        res.json(produtcUpdate)        
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el producto." });
    }
})

router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const deleteProduct = await productManager.deteleProduct(Number(pid))
    res.json(deleteProduct)
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto." });
  }
})

module.exports = router;