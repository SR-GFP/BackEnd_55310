const { Router } = require("express");
const router = Router();
const ProductManager = require ("../Clases/ProductManager.js")
const productManager = new ProductManager("Products")
const fs = require ("fs");
const path = require("path")

router.post("/", (req, res) => {
  try {
    const newCart = {
      id: "cart_" + Date.now(), 
      products: [],
    };
    fs.writeFileSync("carrito.json", JSON.stringify(newCart, null, 2));
    res.status(201).json({ message: "Carrito creado correctamente", cart: newCart });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el carrito" });
  }
});



router.get("/:cid", (req, res) => {
    try {
      const {cid} = req.params;
      const cart = JSON.parse(fs.readFileSync("carrito.json", "utf-8"));
      if (cart.id === cid) {
        res.json(cart);
      } else {
        res.status(404).json({ message: "Carrito no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el carrito" });
    }
  });
  

  router.post("/:cid/product/:pid", (req, res) => {
    try {
      const {cid} = req.params;
      const {pid} = req.params;
      const { quantity } = req.body;      
  
      // Obtener el carrito
      const cart = JSON.parse(fs.readFileSync("carrito.json", "utf-8"));
  
      if (cart.id !== cid) {
        res.status(404).json({ message: "Carrito no encontrado" });
      } else {
        // Buscar el producto en el archivo de productos
        const products = productManager.getProductsFromFile();
        const product = products.find((p) => p.id.toString() === pid);
  
        if (!product) {
          res.status(404).json({ message: "Producto no encontrado" });
        } else {
          // Verificar si el producto ya existe en el carrito
          const existingProduct = cart.products.find((p) => p.product === pid);
  
          if (existingProduct) {            
            existingProduct.quantity += quantity;
          } else {            
            cart.products.push({ product: pid, quantity });
          }          
          fs.writeFileSync("carrito.json", JSON.stringify(cart, null, 2));
          res.json({ message: "Producto agregado al carrito correctamente", cart });
        }
      }
    } catch (error) {
      res.status(500).json({ error: "Error al agregar el producto al carrito" });
    }
  });


module.exports = router;