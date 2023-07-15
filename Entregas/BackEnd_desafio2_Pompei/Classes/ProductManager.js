const fs = require("fs")

class ProductManager{
  constructor (file){
    this.path = `${process.cwd()}/Files/${file}`;
    this.products = [];
    this.lastID = 0;
  }
  /*Metodos */
  addProducts (title, description, price, thumbnail, code, stock){
    try {
      const codeExist = this.products.find((product)=> product.code === code)
    if (codeExist){
      const mensaje = console.log("El codigo ya existe");
      return mensaje;
    }else{
      const ID = this.lastID += 1;
      const newProduct = {
        ID,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      }
      this.products.push(newProduct);
      const mensaje = console.log(`Producto Agregado correctamente el ID del producto es: ${newProduct.ID}`);
        return mensaje;   
    }    
      
    } catch (error) {
      
    }
    
  }
  
  
}

const productManager = new ProductManager();
productManager.addProducts("Cocacola", "Gaseosa gusto Cola", 400, "sin Imagen", "COKE1", 200)
productManager.addProducts("Cocacola", "Gaseosa gusto Cola", 400, "sin Imagen", "COKE2", 200)




