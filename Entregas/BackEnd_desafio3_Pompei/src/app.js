const express = require("express");
const ProductManager = require("./ProductManager");
const puerto = 8080;
const app = express();
const productManager = new ProductManager("Products");


app.get("/products", async (req, res)=>{
  try {    
    const limit = req.query.limit || null;
    const products = await productManager.getProducts();
    
    if (!limit) {      
      res.json(products);
    } else {
      const limitedProducts = products.slice(0, limit);
      res.json({limitedProducts});
    }
  } catch (error) {
    res.json(error)
  }
})



app.listen(puerto, () => {
  console.log(`Server cooriendo en http://localhost:${puerto}`)
});