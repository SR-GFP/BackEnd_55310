const express = require("express");
const ProductManager = require("./ProductManager");
const puerto = 8080;
const app = express();
const productManager = new ProductManager("Products");


app.get("/products", async (req, res)=>{
  try {    
    const {limit} = req.query || null;
    const products = await productManager.getProducts();
    const limitedProducts = products.slice(0, limit);
    return !limit ? res.json(products) : res.json(limitedProducts)
    
    /*if (!limit) {      
      res.json(products);
    } else {
      const limitedProducts = products.slice(0, limit);
      res.json(limitedProducts);
    }*/
  } catch (error) {
    res.json(error)
  }
})

app.get("/products/:pid", async (req, res)=>{
  try {
    const {pid} = req.params;
    const product = await productManager.getProductById(Number(pid));
    res.json(product);    
  } catch (error) {
    res.json(error)
  }
})



app.listen(puerto, () => {
  console.log(`Server cooriendo en http://localhost:${puerto}`)
});