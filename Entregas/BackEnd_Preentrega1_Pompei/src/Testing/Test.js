const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const puerto = 8080;

// Configurar el middleware para el manejo de JSON en las solicitudes
app.use(express.json());

// Ruta raíz GET /api/products
app.get("/api/products", (req, res) => {
  try {
    const products = JSON.parse(fs.readFileSync("productos.json", "utf-8"));
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

// Ruta GET /api/products/:pid
app.get("/api/products/:pid", (req, res) => {
  try {
    const pid = req.params.pid;
    const products = JSON.parse(fs.readFileSync("productos.json", "utf-8"));
    const product = products.find((p) => p.id.toString() === pid);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto" });
  }
});

// Ruta raíz POST /api/products
app.post("/api/products", (req, res) => {
  try {
    const newProduct = req.body;
    const products = JSON.parse(fs.readFileSync("productos.json", "utf-8"));
    const lastId = products.length > 0 ? products[products.length - 1].id : 0;
    newProduct.id = lastId + 1;
    products.push(newProduct);
    fs.writeFileSync("productos.json", JSON.stringify(products, null, 2));
    res.status(201).json({ message: "Producto agregado correctamente", product: newProduct });
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el producto" });
  }
});

// Ruta PUT /api/products/:pid
app.put("/api/products/:pid", (req, res) => {
  try {
    const pid = req.params.pid;
    const updatedFields = req.body;
    const products = JSON.parse(fs.readFileSync("productos.json", "utf-8"));
    const productIndex = products.findIndex((p) => p.id.toString() === pid);
    if (productIndex !== -1) {
      products[productIndex] = { ...products[productIndex], ...updatedFields, id: Number(pid) };
      fs.writeFileSync("productos.json", JSON.stringify(products, null, 2));
      res.json({ message: "Producto actualizado correctamente", product: products[productIndex] });
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
});

// Ruta DELETE /api/products/:pid
app.delete("/api/products/:pid", (req, res) => {
  try {
    const pid = req.params.pid;
    const products = JSON.parse(fs.readFileSync("productos.json", "utf-8"));
    const filteredProducts = products.filter((p) => p.id.toString() !== pid);
    if (filteredProducts.length !== products.length) {
      fs.writeFileSync("productos.json", JSON.stringify(filteredProducts, null, 2));
      res.json({ message: "Producto eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
});

// Ruta raíz POST /api/carts
app.post("/api/carts", (req, res) => {
  try {
    const newCart = {
      id: "cart_" + Date.now(), // Genera un ID único para el carrito
      products: [],
    };
    fs.writeFileSync("carrito.json", JSON.stringify(newCart, null, 2));
    res.status(201).json({ message: "Carrito creado correctamente", cart: newCart });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el carrito" });
  }
});


// Ruta GET /api/carts/:cid
app.get("/api/carts/:cid", (req, res) => {
    try {
      const cid = req.params.cid;
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
  
  // Ruta POST /api/carts/:cid/product/:pid
  app.post("/api/carts/:cid/product/:pid", (req, res) => {
    try {
      const cid = req.params.cid;
      const pid = req.params.pid;
      const { quantity } = req.body;
  
      // Obtener el carrito
      const cart = JSON.parse(fs.readFileSync("carrito.json", "utf-8"));
  
      if (cart.id !== cid) {
        res.status(404).json({ message: "Carrito no encontrado" });
      } else {
        // Buscar el producto en el archivo de productos
        const products = JSON.parse(fs.readFileSync("productos.json", "utf-8"));
        const product = products.find((p) => p.id.toString() === pid);
  
        if (!product) {
          res.status(404).json({ message: "Producto no encontrado" });
        } else {
          // Verificar si el producto ya existe en el carrito
          const existingProduct = cart.products.find((p) => p.product === pid);
  
          if (existingProduct) {
            // Si el producto ya existe, incrementar la cantidad
            existingProduct.quantity += quantity;
          } else {
            // Si el producto no existe, agregarlo al carrito
            cart.products.push({ product: pid, quantity });
          }
  
          // Guardar los cambios en el carrito
          fs.writeFileSync("carrito.json", JSON.stringify(cart, null, 2));
          res.json({ message: "Producto agregado al carrito correctamente", cart });
        }
      }
    } catch (error) {
      res.status(500).json({ error: "Error al agregar el producto al carrito" });
    }
  });
  
  // Iniciar el servidor en el puerto especificado
  app.listen(puerto, () => {
    console.log(`Servidor escuchando en http://localhost:${puerto}`);
  });
  