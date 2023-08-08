const { Router } = require("express");
const router = Router();
const fs = require ("fs");
const CartsManager = require ("../Clases/CartsManager")
const cartsManager = new CartsManager("Carts", "Products");


router.post("/", async(req, res) => {
  try {
    const newCart = await cartsManager.createCart();
    res.json(newCart)
  } catch (error) {
    res.status(400).json({ error: "Error al crear el carrito." })
  }
}) 

router.get("/", async (req,res) =>{
  try {
    const carts = await cartsManager.getCartsFromFile();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: "error al obtener los Carts" });
  }
})

router.get("/:cid", async (req, res) => {
    try {
      const {cid} = req.params;
      const produtsCarts = await cartsManager.getProductsFromCart(Number(cid))
      res.json(produtsCarts)
    } catch (error) {
      
    }
  });
  

  router.post("/:cid/product/:pid", async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      const addProductToCart  = await cartsManager.addProductToCart(Number(cid), Number(pid), Number(quantity));
    res.json(addProductToCart);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el producto al carrito." });
  } 
  })
    


module.exports = router;