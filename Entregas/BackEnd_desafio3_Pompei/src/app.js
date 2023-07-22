const express = require ("express");
const ProductManager = require ("./ProductManager");
const puerto = 8080;
const app = express();
const PM = new ProductManager ("Products");

PM.getProductById(3);

app.get("/", (request,response)=>{
    response.json({message:"Hola Toto"})
})


app.listen(puerto,()=>{
    console.log(`Server cooriendo en http://localhost:${puerto}`)
})