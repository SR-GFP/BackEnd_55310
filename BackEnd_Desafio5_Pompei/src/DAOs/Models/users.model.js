const mongoose = require ("mongoose")

const userColecction = "user"
const userSchema = new mongoose.Schema({
  name:String,
  lastName: String,
  email:{
  type: String,
  unique: true,
  },
  password:{ 
    type:String,
    unique: true,
  }
})

const Users = mongoose.model(userColecction, userSchema)

module.exports = Users