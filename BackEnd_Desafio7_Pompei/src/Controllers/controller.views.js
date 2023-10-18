const { Router} = require ("express")
const router = Router()

router.get("/", (req, res) => {
    
})

router.get("/failregister", (req, res)=>{
  const message = res.json({ status: "error", error: "El registro no se pudo concretar"})
  return message
})

module.exports = router