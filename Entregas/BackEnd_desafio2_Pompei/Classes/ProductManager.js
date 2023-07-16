const fs = require("fs");
const { json } = require("stream/consumers");

class ProductManager{
  constructor (file){
    this.path = `../Files/${file}.json`;
    this.products = [];
    this.lastID = 0;
  }
  /*Metodos */
  addProducts (title, description, price, thumbnail, code, stock){
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
      const mensaje = console.log(`Producto Agregado correctamente el ID del producto es: ${newProduct.ID}`);
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
  async getProducts(){
    try {
      if(fs.existsSync(this.path)){
        const data = await fs.promises.readFile(this.path, 'utf-8');
        this.products = JSON.parse(data);
        const mensaje = console.log(this.products);
        return mensaje;
      }else{        
        return [];
      }
    } catch (error) {
      console.log(`Error al leer el archivo, ${error}`);      
    }
  }
}

const productManager = new ProductManager("ListaDeProductos");
productManager.getProducts();
// productManager.addProducts("falopa", "energizante", 600, "sin Imagen", "Jorgito triple blanco", 2)
// productManager.addProducts("Cocacola", "Gaseosa gusto Cola", 400, "sin Imagen", "Papa Blanca", 200)
// productManager.getProducts();


// const producManagerTest = new ProductManager("Test")
// producManagerTest.get