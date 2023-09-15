require("dotenv").config()

module.exports= {
  PORT: process.env.PORT || 8080,
  dataBase : {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
  },
  SECRET: process.env.SECRET
}