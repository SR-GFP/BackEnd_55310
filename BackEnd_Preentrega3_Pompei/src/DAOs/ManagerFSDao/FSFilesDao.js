const path = require("path")
const fs = require("fs")

class FSFilesDao {
  constructor(){
    this.path = path.join(process.cwd(), "/src/public/files/Products.json")
  }
  async getProductsFromFile() {
    try {
      // Verifica si el archivo existe, lee los productos desde el archivo y los guarda en el array
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        this.products = JSON.parse(data);
        return this.products;
      } else {
        return [];
      }
    } catch (error) {
      return `Error al leer el archivo, ${error}`;
    }
  }
}

module.exports = FSFilesDao;