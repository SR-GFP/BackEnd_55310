const mongoose = require ("mongoose")
const mongoosePaginatio = require ("mongoose-paginate-v2")
const productsCollection = "product"

const productSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
  }, 
  description: {
    type: String,
    required: true,
  }, 
  code:{
    type: String,
    required: true,
    unique: true,
  }, 
  price:{
    type: Number,
    required: true,
  }, 
  status: {
    type: Boolean,
    default: true,
    required: true,
  }, 
  stock: {
    type: Number,
    required: true,
  }, 
  thumbnails: [String],
})

productSchema.plugin(mongoosePaginatio)
const Products = mongoose.model(productsCollection, productSchema)
module.exports = Products