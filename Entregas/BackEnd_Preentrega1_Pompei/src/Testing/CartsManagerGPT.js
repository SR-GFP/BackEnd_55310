const fs = require("fs");  // Importamos el módulo "fs" que nos permitirá trabajar con el sistema de archivos.
const path = require("path");  // Importamos el módulo "path" para manejar rutas de archivos y directorios.

class CartManager {
  constructor(cartFile, productFile) {
    // Constructor de la clase, inicializa las propiedades.
    this.cartFile = path.join(process.cwd(), cartFile + ".json"); // Ruta completa al archivo de carritos.
    this.productFile = path.join(process.cwd(), productFile + ".json"); // Ruta completa al archivo de productos.
    this.carts = this.loadCarts(); // Cargamos los datos de los carritos desde el archivo.
  }

  // Carga los datos de los carritos desde el archivo.
  loadCarts() {
    try {
      if (fs.existsSync(this.cartFile)) {
        // Verificamos si el archivo de carritos existe.
        const data = fs.readFileSync(this.cartFile, "utf-8"); // Leemos el contenido del archivo.
        return JSON.parse(data); // Convertimos los datos del archivo (en formato JSON) en un objeto JavaScript.
      } else {
        return {}; // Si el archivo no existe, devolvemos un objeto vacío.
      }
    } catch (error) {
      console.error(`Error al leer el archivo de carritos: ${error}`); // Si ocurre un error al leer el archivo, lo mostramos en la consola.
      return {}; // Devolvemos un objeto vacío en caso de error.
    }
  }

  // Guarda los datos de los carritos en el archivo.
  saveCarts() {
    try {
      fs.writeFileSync(this.cartFile, JSON.stringify(this.carts, null, 2));
      // Escribimos los datos de los carritos en el archivo en formato JSON con una sangría de 2 espacios para mejorar la legibilidad.
    } catch (error) {
      console.error(`Error al guardar el archivo de carritos: ${error}`); // Si ocurre un error al guardar el archivo, lo mostramos en la consola.
    }
  }

  // Obtiene un carrito por su ID.
  getCartById(cartId) {
    return this.carts[cartId] || null; // Devuelve el carrito con el ID especificado o null si no se encuentra.
  }

  // Crea un nuevo carrito y lo guarda.
  createCart() {
    const newCartId = this.generateUniqueId(); // Genera un ID único para el nuevo carrito.
    this.carts[newCartId] = { id: newCartId, products: [] }; // Crea un nuevo carrito vacío con el ID generado.
    this.saveCarts(); // Guarda los cambios en el archivo.
    return this.carts[newCartId]; // Devuelve el nuevo carrito creado.
  }

  // Genera un ID único para los carritos.
  generateUniqueId() {
    let newId;
    do {
      newId = Math.random().toString(36).substring(2, 15); // Genera un ID aleatorio de 13 caracteres alfanuméricos.
    } while (this.carts[newId]); // Verifica que el ID generado no esté en uso por otro carrito.
    return newId; // Devuelve el ID único generado.
  }

  // Agrega un producto al carrito.
  addProductToCart(cartId, productId, quantity = 1) {
    const product = { productId, quantity }; // Crea un objeto que representa el producto a agregar al carrito.
    if (!this.carts[cartId]) {
      // Si el carrito con el ID especificado no existe, lo crea.
      this.carts[cartId] = { id: cartId, products: [product] };
    } else {
      // Si el carrito ya existe, verifica si el producto ya está en el carrito.
      const existingProduct = this.carts[cartId].products.find(
        (p) => p.productId === productId
      );
      if (existingProduct) {
        // Si el producto ya está en el carrito, incrementa la cantidad.
        existingProduct.quantity += quantity;
      } else {
        // Si el producto no está en el carrito, lo agrega al arreglo de productos del carrito.
        this.carts[cartId].products.push(product);
      }
    }
    this.saveCarts(); // Guarda los cambios en el archivo.
  }

  // Obtener los productos de un carrito por su ID.
  getProductsFromCart(cartId) {
    return this.carts[cartId]?.products || [];
    // Devuelve el arreglo de productos del carrito con el ID especificado, o un arreglo vacío si el carrito no existe o no tiene productos.
  }
}

module.exports = CartManager;
