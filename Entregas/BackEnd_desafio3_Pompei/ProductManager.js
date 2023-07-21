const path = require("path")
const fs = require("fs");

class ProductManager{
  constructor (file){
    this.path = path.join(__dirname, file + ".json");
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

  async getProducts(){
    try {
      await this.getProductsFromFile();
      return console.log(this.products);;
    } catch (error) {
      
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

  async updateProduct(ID, updateField){
    try {      
      const products = await this.getProductsFromFile();
      const productIndex = products.findIndex((produc)=> produc.ID === ID);

      if (productIndex !== -1){
        const productUpdate = {...products[productIndex],...updateField};
        products[productIndex] = productUpdate;
        this.saveProductsToFile(products)
        return console.log("Producto actualizado correctamente");
      }else{
        return console.log("El ID no existe");
      }
    } catch (error) {
      console.log(`error al actualizar el producto, ${error}`);
    }
  }

  async deteleProduct(ID){
    try {
      const products = await this.getProductsFromFile()
      const productIndex = products.findIndex ((product) => product.ID === ID);
      if (productIndex !== -1) {
        products.splice(productIndex,1);
        this.saveProductsToFile(products)
        return console.log("Producto Eliminado correctamente");

      } else {
        return console.log("ID no encontrado");
      }
      

    } catch (error) {
      return console.log(`error al borrar el producto, ${error}`);
    }
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
        return [];
      }
    } catch (error) {
      console.log(`Error al leer el archivo, ${error}`);      
    }
  }
  
}

module.exports = ProductManager;







