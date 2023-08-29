const app = require ("./app")
const port = 9000;

app.listen(port, ()=>{
    console.log(`Server corriendo en localhost:${port}`)
})
