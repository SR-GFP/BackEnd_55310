const mongoose = require("mongoose")
const messagesCollection = "message"

const messagesSchema = new mongoose.Schema({
  user:{
    type: String
  },
  message:{
    type: String
  }
})

const Chat = mongoose.model(messagesCollection, messagesSchema)
module.exports = Chat

