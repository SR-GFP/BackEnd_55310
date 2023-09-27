const { Router } = require("express")
const MongoUsersDao = require ("../DAOs/ManagersMongoDao/MongoUsersDao")
const MongoSessionsDao = require ("../DAOs/ManagersMongoDao/MongoSessionsDao.js")
const { hashedPassword, comaparePassword } = require("../utils/bcrypts.util")
const passport = require("passport")
const { generateToken } = require("../utils/jwt.util")
const router = Router()
const Users = new MongoUsersDao()

router.get("/", (req, res) => {
  res.render("login")
})

router.post("/register",passport.authenticate("register", { failureRedirect: "/failregister"}) , async (req, res) => {  
  try {
    const { name, lastName, email, password, role} = req.body
    if(!name || !lastName || !email || !password){
      return res.status(400).json({status: "error", error: "Faltan datos obligatorios"})
    }
    const userInfo = {
      name,
      lastName,
      email,
      password: hashedPassword(password),
      role: "User",
    }    
    const userExist = await Users.getOneUser(email)    
    if(!userExist){
      const newUser =await Users.addUsers(userInfo)
      console.log(`usuatio creado ${newUser}`);      
      return res.status(201).json({ status:"Success", payload:`Usuario creado correctamente. ID:${newUser._id}` })
    }else{      
      return res.status(400).json({status: "error", error: "El email ya esta registrado"})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", error: "internal Server error" })
  }
})

router.get("/failregister", (req, res)=>{
  res.json({ status: "error", error: "El registro no se pudo concretar"})
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    if(email === "adminCoder@coder.com" && password === "adminCod3r123"){
      const admin = {
        email,
        password,
        name: "Admin",
        role: "Admin",
      }
      req.session.email = admin.email,
      req.session.name = admin.name,
      req.session.role = admin.role
      return res.status(200).json({status: "Success", payload: `Bienvenido ${admin.name}  -  Rol: ${admin.role}`})
      }

    if( !email || !password){
      console.log(error);
      return res.status(400).json({status: "error", error: "Faltan datos obligatorios"})
    }
    const userLogged = {      
      email,
      password,
    }    
    const user = await Users.getOneUser(email)    
    if(!user){
      console.log(error);
      return res.status(400).json({ status:"error", error:"El ususario y la contraseña no coinciden" })
    }
    if(!comaparePassword(userLogged.password, user.password)){      
      return res.status(400).json({status: "error", error:"El ususario y la contraseña no coinciden"})
    }

    generateToken(user._id)
    console.log(user._id)
    res.status(200).json({status: "Success", payload: `Bienvenido ${user.name}  -  Rol: ${user.role}`})
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", error: "El ususario y la contraseña no coinciden" })
  }
})

router.get('/logout', (req, res) => {  
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({error: "Error al cerrar la sesion"})
      console.log(error);
    } else {
      console.log("Session cerrada");
      res.redirect('/');            
    }
  });
});

module.exports = router