const Products = require("../Models/products")

class mongoProductsDao {
  async getAllProducts() {
    return await Products.find({status:true})
  }

  async getProductById(id) {
    return await Products.find({ _id: id })
  }

  async addProduct(productInfo) {
    return await Products.create(productInfo)
  }

  async updateProduct(id, productInfo) {
    return await Products.updateOne({ _id: id }, productInfo)
  }

  async deleteProduct(id){
    return await Products.updateOne({ _id: id }, {status:false})
  }
}

module.exports = mongoProductsDao