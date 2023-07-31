const {Router} = require ("express");
const router = Router();
const ProductManager = require("../Clases/ProductManager");
const productManager = new ProductManager("Products");

router.get("/", async(req,res)=>{
    try {
        const {limit} = req.query || null;
        const products = await productManager.getProducts();
        const limitedProducts = products.slice(0, limit);
        return !limit ? res.json(products) : res.json(limitedProducts)
    } catch (error) {
        res.json(error);
    }
})

router.get("/:pid", async (req,res)=>{
try {    
    const {pid} = req.params;
    const producById = await productManager.getProductById(Number(pid));
    res.json(producById);
} catch (error) {
    res.json(error)
}
})

router.post("/", async (req,res)=>{
try {
    const { 
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails} = req.body;
        const createProduct =  productManager.addProducts(title,description,price,thumbnails,code,stock);
        res.json(createProduct);
} catch (error) {
    res.json(error)
}
})

router.put("/:pid", async (req,res)=>{
    try {
        const { pid }  = req.params;
        const updateField = req.body;
        console.log(req.body);
        const actualizado = await productManager.updateProduct(number(pid), updateField)
        console.log(updateField);
        res.json(actualizado)        
    } catch (error) {
        res.json(error)
    }
})

router.delete("/:pid", async (req,res)=>{
    try {
        const { pid } = req.params;
        const deleteProduct = await productManager.deteleProduct(Number(pid))        
        res.json(deleteProduct)
    } catch (error) {
        res.json(error)
    }
})
module.exports = router;