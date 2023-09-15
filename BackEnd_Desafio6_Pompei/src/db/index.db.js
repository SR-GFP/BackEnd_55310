const mongoose = require("mongoose")
const { dataBase } = require("../config/db.config")

const mongoConnect = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${dataBase.user}:${dataBase.pass}@${dataBase.host}/${dataBase.name}?retryWrites=true&w=majority`)
    console.log(`Database ${dataBase.name} is connected`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = mongoConnect