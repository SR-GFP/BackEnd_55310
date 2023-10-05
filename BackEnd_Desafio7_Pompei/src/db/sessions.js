const MongoStore = require("connect-mongo")
const { dataBase, SECRET } = require ("../config/enviroments.config");
const session = require("express-session");


module.exports = (app) => {
  app.use(
    session({
      store: MongoStore.create({        
        mongoUrl: `mongodb+srv://${dataBase.user}:${dataBase.pass}@${dataBase.host}/${dataBase.name}?retryWrites=true&w=majority`,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 3600,
      }),
      secret: `${SECRET}`,
      resave: false,
      saveUninitialized: false,
    })
  );
};
