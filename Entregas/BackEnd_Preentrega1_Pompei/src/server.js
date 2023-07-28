const app = require ("./app")
const port = 8080;

app.listen(port, ()=>{
    console.log(`Server corriendo en localhost:${port}`)
})
