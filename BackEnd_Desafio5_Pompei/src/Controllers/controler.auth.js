const { Router } = require("express")
const MongoUsersDao = require ("../DAOs/ManagersMongoDao/MongoUsersDao")
const MongoSessionsDao = require ("../DAOs/ManagersMongoDao/MongoSessionsDao.js")
const { hashedPassword, comaparePassword } = require("../utils/bcrypts")
const router = Router()
const Users = new MongoUsersDao()

router.get("/", (req, res) => {
  res.render("login")
})

router.post("/register", async (req, res) => {  
  try {
    const { name, lastName, email, password } = req.body
    if(!name || !lastName || !email || !password){
      return res.status(400).json({status: "error", error: "Faltan datos obligatorios"})
    }
    const userInfo = {
      name,
      lastName,
      email,
      password: hashedPassword(password),
    }    
    const userExist = await Users.getOneUser(email)
    console.log(`"usuario encontrado" ${userExist}`);
    if(!userExist){
      const newUser =await Users.addUsers(userInfo)
      console.log(newUser);
      return res.status(201).json({ status:"Success", payload:`Usuario creado correctamente. ID:${newUser._id}` })
    }else{
      console.log("email registrado");
      return res.status(400).json({status: "error", error: "El email ya esta registrado"})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", error: "internal Server error" })
  }
})


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    if( !email || !password){
      console.log(error);
      return res.status(400).json({status: "error", error: "Faltan datos obligatorios"})
    }
    const userLogged = {      
      email,
      password,
    }    
    const user = await Users.getOneUser(email)
    console.log(`"usuario encontrado" ${user}`);
    if(!user){
      console.log(error);
      return res.status(400).json({ status:"error", error:"El ususario y la contraseña no coinciden" })
    }
    if(!comaparePassword(userLogged.password, user.password)){
      console.log("email registrado");
      return res.status(400).json({status: "error", error:"El ususario y la contraseña no coinciden"})
    }
    
    req.session.email = user.email
    
    res.status(200).json({status: "Success", payload: `Bienvenido ${user.name}`})
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", error: "internal Server error" })
  }
})


module.exports = router