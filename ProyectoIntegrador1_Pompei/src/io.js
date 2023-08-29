const { Server } = require("socket.io");
const Products = require("./DAOs/ManagersMongoDao/MongoProductsDao");
const ProductsDao = new Products()
const Chat = require("./DAOs/Models/chat")



const inicilizeIO = httpServer => {
  const io = new Server(httpServer)
  io.on("connection", async socket => {
    console.log(`Nuevo cliente conectado: ${socket.id}`);
    try {
      const products = await ProductsDao.getAllProducts();
      socket.emit("products", products);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }

    socket.on("newProduct", async data => {
      try {
        const products = await ProductsDao.getAllProducts();
        io.emit("products", products);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    });

    socket.on( 'message', async (data) => {
      await Chat.create( data );
      const messages = await Chat.find();
      
      io.emit( 'messageLogs', messages )
  })
  
  socket.on( 'auth', async (data) => {
      const messages = await Chat.find();
      socket.emit( 'messageLogs', messages );

      socket.broadcast.emit( 'newUser', data );
  })
  });
}
module.exports = inicilizeIO