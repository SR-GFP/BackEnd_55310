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
      this.saveProductsToFile();
      const mensaje = console.log(`Producto Agregado correctamente el ID del producto es: ${newProduct.ID}`);
      return mensaje;
    }    
  }
  getProducts(){
    return this.getProductsFromFile();  
  }

  async saveProductsToFile(){
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.products))      
    } catch (error) {
      console.log(error);
    }
  }
  async getProductsFromFile(){
    try {
      if(fs.existsSync(this.path)){
        const data = await fs.promises.readFile(this.path, 'utf-8');
        this.products = JSON.parse(data);        
        return this.products;
      }else{
        console.log([]);
        return [];
      }
    } catch (error) {
      console.log(`Error al leer el archivo, ${error}`);      
    }
  }
  async getProductById(ID){
    try {
      const products = await this.getProductsFromFile();
      const existID = products.find ((product) => product.ID === ID);
      return existID ? console.log(existID) : console.log("El ID no existe");      
    } catch (error) {
      console.log(`error al obtener el producto, ${error}`);
    }
  }
}

const productManager = new ProductManager("ListaDeProductos");






// const producManagerTest = new ProductManager("Test")
// producManagerTest.get