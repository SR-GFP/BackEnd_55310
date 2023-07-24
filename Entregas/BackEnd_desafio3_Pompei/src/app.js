const express = require("express");
const ProductManager = require("./ProductManager");
const puerto = 8080;
const app = express();
const productManager = new ProductManager("Products");


// Endpoint para obtener todos los productos con posibilidad de limitar el resultado
// Si no se proporciona el parámetro 'limit', devuelve todos los productos; de lo contrario, devuelve los productos limitados según el valor de 'limit'
app.get("/products", async (req, res)=>{
  try {    
    const {limit} = req.query || null; // Obtiene el parámetro 'limit' desde el query de la URL
    const products = await productManager.getProducts();
    const limitedProducts = products.slice(0, limit);
    return !limit ? res.json(products) : res.json(limitedProducts);        
  } catch (error) {
    res.json(error)
  }
})


// Endpoint para obtener un producto por su id (pid)
app.get("/products/:pid", async (req, res)=>{
  try {
    const {pid} = req.params; // Obtiene el parámetro 'pid' desde los parámetros de la URL
    const product = await productManager.getProductById(Number(pid));
    res.json(product);    
  } catch (error) {
    res.json(error)
  }
})



app.listen(puerto, () => {
  console.log(`Server cooriendo en http://localhost:${puerto}`)
});