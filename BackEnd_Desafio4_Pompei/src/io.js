const {Server} = require ("socket.io")

const initializeIO = httpServer =>{
    const io = new Server(httpServer)    
    io.on("connection", socket =>{
        console.log("Cliente Conectado")        
    })
    io.on("newProduct", product=>{
        io.emit("newProduct", product)
    })
    return io;
}

module.exports = initializeIO

