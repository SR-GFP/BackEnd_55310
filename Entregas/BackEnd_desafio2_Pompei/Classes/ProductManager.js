const fs = require("fs");
const { json } = require("stream/consumers");

class ProductManager{
  constructor (file){
    this.path = `../Files/${file}`;
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
      };
      this.products.push(newProduct);
      this.saveProductsFile();
      const mensaje = console.log(`Producto Agregado correctamente el ID del producto es: ${this.products}`);
      return mensaje;
    }
    } catch (error) {
      const mensaje = console.log(error);
      return mensaje;        
    }    
  }
  async saveProductsFile(){
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.products))      
    } catch (error) {
      console.log(error);
    }
  }
}

const productManager = new ProductManager("ListaDeProductos");
productManager.addProducts("falopa", "energizante", 600, "sin Imagen", "Jorgito triple blanco", 2)
productManager.addProducts("Cocacola", "Gaseosa gusto Cola", 400, "sin Imagen", "Jorgito triple blanco", 200)




