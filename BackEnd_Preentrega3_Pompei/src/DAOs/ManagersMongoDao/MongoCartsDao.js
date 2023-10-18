const Carts = require("../Models/carts.model")


class mongoCartsDao {
  async getAllCarts() {
    return await Carts.find()
  }

  async getCartById(id) {
    return await Carts.find({ _id: id })
  }

  async addCart(cartInfo) {
    return await Carts.create(cartInfo)
  }

  async updateCart(id) {
    return await Carts.updateOne({ _id: id })
  }

  async deleteProduct(id) {
    return await Carts.delete({ _id: id })
  }
}

module.exports = mongoCartsDao