const express = require ("express");
const ProductManager = require ("./ProductManager");
const productManager = ProductManager;
const puerto = 8080;
const app = express();
app.use(express.static("public"))


app.listen(puerto, ()=>{
  console.log(`Server corriendo en localhost:${puerto}`)
})