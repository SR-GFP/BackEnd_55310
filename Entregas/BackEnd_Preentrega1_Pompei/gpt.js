app.put("/api/products/:pid", (req, res) => {
    try {
      const pid = req.params.pid; // Obtiene el valor del parámetro :pid de la URL (ID del producto a actualizar)
      const updatedFields = req.body; // Obtiene los campos actualizados del producto desde el cuerpo de la solicitud (en formato JSON)
      const products = JSON.parse(fs.readFileSync("productos.json", "utf-8")); // Lee el contenido del archivo "productos.json" y lo convierte a un array de productos
      const productIndex = products.findIndex((p) => p.id.toString() === pid); // Busca el índice del producto en el array de productos que tiene el ID igual al pid proporcionado en la URL
  
      if (productIndex !== -1) { // Si se encontró el producto en el array de productos
        // Actualiza los campos del producto en el array de productos usando spread operator (...) para copiar los campos existentes y sobrescribiendo los campos actualizados
        // También se asegura de que el ID del producto se convierta en un número (ya que los parámetros de la URL son cadenas)
        products[productIndex] = { ...products[productIndex], ...updatedFields, id: Number(pid) };
        
        // Escribe los productos actualizados de nuevo en el archivo "productos.json" en formato JSON con indentación de 2 espacios
        fs.writeFileSync("productos.json", JSON.stringify(products, null, 2));
        
        // Envía una respuesta al cliente con un mensaje y el objeto del producto actualizado
        res.json({ message: "Producto actualizado correctamente", product: products[productIndex] });
      } else {
        // Si no se encontró el producto en el array de productos, responde con un estado HTTP 404 y un mensaje
        res.status(404).json({ message: "Producto no encontrado" });
      }
    } catch (error) {
      // Si ocurre algún error durante la ejecución del bloque try, responde con un estado HTTP 500 y un mensaje de error
      res.status(500).json({ error: "Error al actualizar el producto" });
    }
  });
  