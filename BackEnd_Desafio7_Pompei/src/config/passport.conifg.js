const passport = require("passport")
const local = require("passport-local")
const usersDao = require("../DAOs/ManagersMongoDao/MongoUsersDao")
const { hashedPassword, comaparePassword } = require("../utils/bcrypts.util")
const Users = new usersDao()

const LocalStrategy = local.Strategy

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy({ passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { name, lastname, email } = req.body
        try {
          const user = await Users.getOneUser( email )
          if (user) {
            console.log("El usuario ya esta registrado");
            return done(null, false)
          }
          const userInfo = {
            name,
            lastname,
            email,
            password: hashedPassword(password),
          }
          const newUser = await Users.addUsers(userInfo)
          return done(null, newUser)
        } catch (error) {
          done(`Error al crear Usuario: ${error} `);
        }
      }))

  passport.use("login", new LocalStrategy({ usernameField: "email" },
    async (username, password, done) => {
      try {
        const user = await Users.getOneUser({ email: username })
        if (!user) {
          console.log("El ususario no existe");
          return done(null, false)
        }
        if (!comaparePassword(password, user.password)) {
          return done(null, user)
        }
      } catch (error) {
        done(error);
      }
    }))
}


module.exports = initializePassport