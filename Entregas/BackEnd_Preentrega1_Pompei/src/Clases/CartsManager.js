const fs = require("fs");
const path = require("path");

class CartManager {
  constructor(cartFile, productFile) {
    this.cartFile = path.join(process.cwd(), cartFile + ".json");
    this.productFile = path.join(process.cwd(), productFile + ".json");
    this.carts = this.loadCarts();
  }

  // Carga los datos de los carritos desde el archivo
  loadCarts() {
    try {
      if (fs.existsSync(this.cartFile)) {
        const data = fs.readFileSync(this.cartFile, "utf-8");
        return JSON.parse(data);
      } else {
        return {};
      }
    } catch (error) {
      console.error(`Error al leer el archivo de carritos: ${error}`);
      return {};
    }
  }

  // Guarda los datos de los carritos en el archivo
  saveCarts() {
    try {
      fs.writeFileSync(this.cartFile, JSON.stringify(this.carts, null, 2));
    } catch (error) {
      console.error(`Error al guardar el archivo de carritos: ${error}`);
    }
  }

  // Obtiene un carrito por su ID
  getCartById(cartId) {
    return this.carts[cartId] || null;
  }

  // Crea un nuevo carrito y lo guarda
  createCart() {
    const newCartId = this.generateUniqueId();
    this.carts[newCartId] = { id: newCartId, products: [] };
    this.saveCarts();
    return this.carts[newCartId];
  }

  // Genera un ID único para los carritos
  generateUniqueId() {
    let newId;
    do {
      newId = Math.random().toString(36).substring(2, 15);
    } while (this.carts[newId]);
    return newId;
  }

  // Agrega un producto al carrito
  addProductToCart(cartId, productId, quantity = 1) {
    const product = { productId, quantity };
    if (!this.carts[cartId]) {
      this.carts[cartId] = { id: cartId, products: [product] };
    } else {
      const existingProduct = this.carts[cartId].products.find(
        (p) => p.productId === productId
      );
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        this.carts[cartId].products.push(product);
      }
    }
    this.saveCarts();
  }

  // Obtener los productos de un carrito por su ID
  getProductsFromCart(cartId) {
    return this.carts[cartId]?.products || [];
  }
}

module.exports = CartManager;
