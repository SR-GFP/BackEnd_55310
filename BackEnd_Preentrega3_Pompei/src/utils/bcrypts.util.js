const bcrypt = require ("bcrypt")

const hashedPassword = pasword =>{
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(pasword, salt)
}

const comaparePassword = (password, passwordHashed)=>{
  return bcrypt.compareSync(password, passwordHashed)
}


module.exports ={
  hashedPassword,
  comaparePassword,
}
