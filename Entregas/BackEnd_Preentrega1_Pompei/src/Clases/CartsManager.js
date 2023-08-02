const fs = require("fs");
const path = require("path");
const ProductManager = require("./ProductManager");
const productManager = new ProductManager("Products");

class CartManager {
  constructor(file) {
    this.path = path.join(process.cwd(), file + ".json");
    this.cars = [];
    this.lastID = 0;    
  }

  async createCart() {
    const newCartId = this.lastID + 1;
    while (this.carts[newCartId]) {
      newCartId++;
    }
    const newCart = {id: newCartId,products: []};
    this.carts[newCartId] = newCart;
    await this.saveCartsToFile();
    this.lastID = newCartId; // Actualizamos el lastID con el nuevo valor generado
    return newCart;
  }
  
  async getCartsFromFile() {
    try {
      if (fs.existsSync(this.cartFile)) {
        const data = await fs.promises.readFile(this.cartFile, "utf-8");
        this.carts = JSON.parse(data)
        return this.carts;
      } else {
        return {};
      }
    } catch (error) {
      return `Error al leer el archivo de carritos: ${error}`;
    }
  }




  // Guarda los datos de los carritos en el archivo
  async saveCartsToFile() {
    try {
      await fs.promises.writeFileSync(this.cartFile, JSON.stringify(this.carts));
    } catch (error) {
      return `Error al guardar el archivo de carritos: ${error}`;
    }
  }



  // Obtiene un carrito por su ID
  async getCartById(ID) {
    try {
      if (!ID) {
        return "Por Favor intruduzca un ID"
      } else {
        const carts = await this.getCartsFromFile()
        const existID = carts.find((c) => c.ID === ID);
        return existID ? existID : { message: "El carrito no existe" };
      }
    } catch (error) {
      return `error al obtener el carrito, ${error}`;
    }
  }


  // Crea un nuevo carrito y lo guarda
  





  // Agrega un producto al carrito
  async addProductToCart(cartId, productId, quantity = 1) {
    const product = { productId, quantity };
    if (!this.carts[cartId]) {
      this.carts[cartId] = { id: cartId, products: [product] };
    } else {
      const existingProduct = this.carts[cartId].products.find((p) => p.productId === productId);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        this.carts[cartId].products.push(product);
      }
    }
    await this.saveCartsToFile()
  }

  // Obtener los productos de un carrito por su ID
  getProductsFromCart(cartId) {
    return this.carts[cartId]?.products || [];
  }
}

module.exports = CartManager;
