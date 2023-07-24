
const path = require("path")
const fs = require("fs");
const { error } = require("console");

class ProductManager {
  constructor(file) {
    this.path = path.join(__dirname, file + ".json");
    this.products = [];
    this.lastID = 0;
  }

  /*Consejos del tutor:
  1_A mejorar o implementar  métodos que reciben parámetros realizar una evaluación más completa en los campos obligatorios.
  2_Comentar codigo para referencia de los metodos*/
  
  //Metodos
  addProducts(title, description, price, thumbnail, code, stock) {
    const codeExist = this.products.find((p) => p.code === code)    
    if (!title || !description || !price || !code || !stock) {
      return console.log("Por favor, completa todos los campos obligatorios.");      
    } else if (codeExist) {
      const mensaje = console.log("El codigo ya existe");
      return mensaje;
    } else {
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

  async getProducts() {
    try {
      await this.getProductsFromFile();
      return this.products;
    } catch (error) {
      return "Error al cargar los archivos", error;
    }
  }

  async getProductById(ID) {
    try {
      if (!ID){
        return "Por favor, introduzca un ID";
      }else{
        const products = await this.getProductsFromFile();
        const existID = products.find((p) => p.ID === ID);
        return existID ?  existID : { message: "El producto no existe"};
      }
    } catch (error) {
      console.log(`error al obtener el producto, ${error}`);
    }
  }

  async updateProduct(ID, updateField) {
    try {
      if(!ID || !updateField){
        return console.log("Por favor, completa todos los campos obligatorios.");
      }else{
        const products = await this.getProductsFromFile();
        const productIndex = products.findIndex((p) => p.ID === ID);
  
        if (productIndex !== -1) {
          const productUpdate = { ...products[productIndex], ...updateField};
          products[productIndex] = productUpdate;          
          this.saveProductsToFile(products)
          return console.log("Producto actualizado correctamente");
        } else {
          return console.log("El ID no existe");
        }
      }
    } catch (error) {
      console.log(`error al actualizar el producto, ${error}`);
    }
  }

  async deteleProduct(ID) {
    try {
      const products = await this.getProductsFromFile()
      const productIndex = products.findIndex((p) => p.ID === ID);
      if (productIndex !== -1) {
        products.splice(productIndex, 1);
        this.saveProductsToFile(products)
        return console.log("Producto Eliminado correctamente");
      } else {
        return console.log("ID no encontrado");
      }
    } catch (error) {
      return console.log(`error al borrar el producto, ${error}`);
    }
  }

  async saveProductsToFile() {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.products))
    } catch (error) {
      console.log(error);
    }
  }
  async getProductsFromFile() {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        this.products = JSON.parse(data);
        return this.products;
      } else {
        return [];
      }
    } catch (error) {
      console.log(`Error al leer el archivo, ${error}`);
    }
  }

}

module.exports = ProductManager;