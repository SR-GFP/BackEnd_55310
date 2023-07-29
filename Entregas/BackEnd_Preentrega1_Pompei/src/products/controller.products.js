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
        const createProduct = await productManager.addProducts(
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        );
        res.json(createProduct);
} catch (error) {
    res.json(error)
}
})

router.put("/:id", (req,res)=>{
    res.json({ message: `product update ${req.params.id}` })
})

router.delete("/:pid", async (req,res)=>{
    try {
        const { pid } = req.params;
        const deleteProduct = await productManager.deteleProduct(pid)        
        res.json(deleteProduct)        
    } catch (error) {
        res.json(error)
    }
})
module.exports = router;