const app = require("./app");
const initializeIO = require("./io");

const PORT = 8080

const httpServer = app.listen(PORT,() =>{
    console.log(`Server runnin in port ${PORT}`);
})

initializeIO(httpServer)