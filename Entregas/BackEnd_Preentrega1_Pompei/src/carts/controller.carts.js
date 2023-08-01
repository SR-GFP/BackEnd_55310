const { Router } = require("express");
const router = Router();
const CartsManager = require("../Clases/CartsManager");
const cartsManager = CartsManager();


// Ruta para crear un nuevo carrito
cartRouter.post("/", (req, res) => {
  const newCart = cartManager.createCart();
  res.json(newCart);
});

// Ruta para obtener los productos de un carrito por su ID
cartRouter.get("/:cid", (req, res) => {
  const cartId = req.params.cid;
  const products = cartManager.getProductsFromCart(cartId);
  res.json(products);
});

// Ruta para agregar un producto a un carrito
cartRouter.post("/:cid/product/:pid", (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = parseInt(req.body.quantity) || 1;

  cartManager.addProductToCart(cartId, productId, quantity);
  res.json({ message: "Producto agregado al carrito correctamente" });
});

module.exports = cartRouter;

