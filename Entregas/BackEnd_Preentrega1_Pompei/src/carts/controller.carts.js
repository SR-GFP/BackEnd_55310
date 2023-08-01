const { Router } = require("express");
const router = Router();
const CartsManager = require("../Clases/CartsManager");
const cartsManager = CartsManager();

cartRouter.post("/", (req, res) => {
  const newCart = cartsManager.createCart();
  res.json(newCart);
});

// Ruta para obtener los productos de un carrito por su ID
cartRouter.get("/:cid", (req, res) => {
  const {cid} = req.params;
  const products = cartsManager.getProductsFromCart(cid);
  res.json(products);
});

// Ruta para agregar un producto a un carrito
cartRouter.post("/:cid/product/:pid", (req, res) => {
  const {cid} = req.params;
  const {pid} = req.params;
  const quantity = parseInt(req.body.quantity) || 1;

  cartsManager.addProductToCart(cid, pid, quantity);
  res.json({ message: "Producto agregado al carrito correctamente" });
});



module.exports = router;