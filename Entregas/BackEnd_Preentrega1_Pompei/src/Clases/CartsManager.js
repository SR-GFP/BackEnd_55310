const fs = require("fs");
const path = require("path");
const ProductManager = require("./ProductManager");

class CartsManager {
  constructor(file, productFile) {
    this.path = path.join(process.cwd(), file + ".json");
    this.productManager = new ProductManager(productFile);
    this.carts = [];
    this.lastID = 0;
  }

  // Carga los datos de los carritos desde el archivo
  async getCartsFromFile() {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        this.carts = JSON.parse(data)
        return this.carts;
      } else {
        return [];
      }
    } catch (error) {
      return `Error al leer el archivo, ${error}`
    }
  }

  // Guarda los datos de los carritos en el archivo
  async saveCartsToFile() {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
    } catch (error) {
      console.error("Error al guardar el archivo de carritos:", error);
    }
  }

  // Genera un nuevo ID para el carrito basado en el último ID existente
  generateNewCartID() {
    this.lastID++;
    while (this.carts[this.lastID]) {
      this.lastID++;
    }
    return this.lastID;
  }

  // Crea un nuevo carrito y lo guarda en el archivo
  async createCart() {
    this.carts = await this.getCartsFromFile();
    const newCartId = this.generateNewCartID();
    const newCart = {
      id: newCartId,
      products: []
    };
    this.carts[newCartId] = newCart;
    await this.saveCartsToFile();
    return newCart;
  }

  // Obtiene un carrito por su ID
  async getCartById(ID) {
    if (!ID) {
      return "Por favor, intruduzca un ID";
    } else {
      this.carts = await this.getCartsFromFile();
      const cart = this.carts[ID];
      return cart ? cart : { message: "El carrito no existe" };
    }
  }

  // Agrega un producto al carrito
  async addProductToCart(cartId, productId, quantity = 1) {
    this.carts = await this.getCartsFromFile();
    const cart = this.carts[cartId];
    if (!cart) {
      return "El carrito no existe";
    }

    const product = { productId, quantity };
    const existingProduct = cart.products.find((p) => p.productId === productId);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push(product);
    }

    await this.saveCartsToFile();
    return "Producto agregado al carrito correctamente";
  }

  // Obtener los productos de un carrito por su ID
  async getProductsFromCart(cartId) {
    this.carts = await this.getCartsFromFile();
    const cart = this.carts[cartId];
    return cart ? cart.products : [];
  }
}

module.exports = CartsManager;
