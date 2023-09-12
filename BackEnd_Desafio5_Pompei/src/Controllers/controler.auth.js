const { Router } = require("express")
const MondoUsersDao = require ("../DAOs/ManagersMongoDao/MongoSessionsDao")
const router = Router()

router.get("/", (req, res) => {
  res.render("login")
})

router.post("/register", async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body
    const userInfo = {
      name,
      lastName,
      email,
      password
    }


  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", error: "internal Server error" })
  }
})

router.post("/login", async (req, res) => {
  try {

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", error: "internal Server error" })
  }
})
module.exports = router