const mongoose = require ("mongoose")

const userColecction = "user"
const userSchema = new mongoose.Schema({
  name:String,
  lastName: String,
  email: String,
  password: String,
  role:String,    
})

const Users = mongoose.model(userColecction, userSchema)




module.exports = Users

