const { Router } = require("express");
const router = Router();
const CartsManager = require("../Clases/CartsManager");
const cartsManager = new CartsManager("Carts");

router.post("/", async (req, res) => {
  const newCart = await cartsManager.createCart();
  res.json(newCart);
});

// Ruta para obtener los productos de un carrito por su ID
router.get("/:cid", async (req, res) => {
  const {cid} = req.params;
  const products = await cartsManager.getProductsFromCart(cid);
  res.json(products);
});

// Ruta para agregar un producto a un carrito
router.post("/:cid/product/:pid", async (req, res) => {
  const {cid} = req.params;
  const {pid} = req.params;
  const quantity = parseInt(req.body.quantity) || 1;

  const productAdd = await cartsManager.addProductToCart(Number(cid), Number(pid), Number(quantity));
  res.json({ message: `Producto agregado al carrito correctamente, ${productAdd}` });
});



module.exports = router;