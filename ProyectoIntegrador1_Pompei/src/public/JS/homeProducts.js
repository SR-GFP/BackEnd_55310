//capturo todos lso ID que necesito de home.handlebars

const getProductsBtn = document.getElementById('get-products-btn');
const updateProductsBtn = document.getElementById('update-products-btn');
const createProductsBtn = document.getElementById('create-products-btn');
const deleteProductsBtn = document.getElementById('delete-products-btn');
const productsContainer = document.getElementById('products-container');
const updateFormContainer = document.getElementById('update-form-container');
const createFormContainer = document.getElementById('create-form-container');
const deleteFormContainer = document.getElementById('delete-form-container');
const formUpdate = document.getElementById("update-form");
const formCreate = document.getElementById("create-form-container");
const formDelete = document.getElementById("delete-form-container");

//los botones ocultan y muestran los formularios segun la eleccion para manejar los productos
//muesta todos los prductos de la base de datos
getProductsBtn.addEventListener('click', () => {    
    productsContainer.style.display = 'block';    
    updateFormContainer.style.display = 'none';
    createFormContainer.style.display = 'none';
    deleteFormContainer.style.display = 'none';
});
//muestra el formulario para actualizar productos
updateProductsBtn.addEventListener('click', () => {
    updateFormContainer.style.display = 'block';    
    productsContainer.style.display = 'none';
    createFormContainer.style.display = 'none';
    deleteFormContainer.style.display = 'none';
});

//muestra el formulario para creart productos
createProductsBtn.addEventListener('click', () => {
    createFormContainer.style.display = 'block';    
    productsContainer.style.display = 'none';
    updateFormContainer.style.display = 'none';
    deleteFormContainer.style.display = 'none';
});
//muestra el formulario para eliminar productos
deleteProductsBtn.addEventListener('click', () => {
    deleteFormContainer.style.display = 'block';    
    productsContainer.style.display = 'none';
    updateFormContainer.style.display = 'none';
    createFormContainer.style.display = 'none';
});

// tomo los datos de los formularios para enviar a la base de datos
