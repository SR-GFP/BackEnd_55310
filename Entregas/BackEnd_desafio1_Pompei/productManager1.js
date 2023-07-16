/*
Clases con ECMAScript y ECMAScript avanzado
1_Se creará una instancia de la clase “ProductManager”
2_Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
3_Se llamará al método “addProduct” con los campos:
    title: “producto prueba”
    description:”Este es un producto prueba”
    price:200,
    thumbnail:”Sin imagen”
    code:”abc123”,
    stock:25
4_El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
5_Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
6_Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
7_Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
*/

class ProductManager{
    constructor (){
        this.path
        this.productos = [];
        this.lastID = 0;  
    }

    getProducts(){
        return this.productos; 
    }

    addProduct (title, description, price, thumbnail, code, stock){
        const existeCode =  this.productos.find((product) => product.code === code)
        if (existeCode){
            console.log("El codigo declarado ya esta en uso")
        }else {
            const id =++ this.lastID
            const newProduct = {
                id,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }
            this.productos.push(newProduct);
            console.log("Producto agregado correctamente")
        }
        
    }

    getProductById(id){
        const producto = this.productos.find((producto) => producto.id === id)
        return producto ? console.log("El Id corresponde al producto", producto) : console.log("El producto no existe");        
    }
}

// Pruebas

const productManager =  new ProductManager();
console.log(productManager.getProducts());

productManager.addProduct("Cocacola", "Gaseosa gusto Cola", 400, "sin Imagen", "COKE1", 200);
productManager.addProduct("Cocacola", "Gaseosa gusto Cola", 400, "sin Imagen", "COKE1", 200);
productManager.addProduct("Cocacola", "Gaseosa gusto Cola", 400, "sin Imagen", "COKE2", 200);
console.log(productManager.getProducts());
console.log(productManager.getProductById(10));
console.log(productManager.getProductById(1));





