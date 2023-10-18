const multer = require("multer")

const imgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.cwd() + "/src/public/img")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const imgUpLoader = multer({ storage: imgStorage })

const jsonStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.cwd() + "/src/public/files")
  },
  filename: (req, file, cb) => {
    const newName = "Products.json"
    cb(null, newName)
  }
})

const jsonUpLoader = multer({ storage: jsonStorage })

module.exports = {
  imgUpLoader,
  jsonUpLoader,
};