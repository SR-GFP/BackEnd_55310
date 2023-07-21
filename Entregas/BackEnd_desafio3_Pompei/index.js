const express = require ("express");
const ProductManager = require ("./ProductManager");
const app = express();

const productManager = new ProductManager ();

const puerto = 3000;
app.listen(puerto,()=>{
    console.log(`Server cooriendo en http://localhost:${puerto}`)
})

