const app = require ("./app")
const { PORT } = require("./config/db.config");
const io = require("./io");


const httpServer = app.listen(PORT, () => {
  console.log(`Server Running at port ${PORT}`);
})

io(httpServer)
