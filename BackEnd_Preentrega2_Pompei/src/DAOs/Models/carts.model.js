const mongoose = require("mongoose")

const cartsColection = "cart"
const cartsSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
        quantity:{
          type: Number,
          default: 1,
        }
      }
    ],
    default: [],
  }
})


const Carts = mongoose.model(cartsColection, cartsSchema)

module.exports = Carts