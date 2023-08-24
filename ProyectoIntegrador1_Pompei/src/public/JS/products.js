
//capturo todos los ID que necesito de home.handlebars
const getProductsBtn = document.getElementById('get-products-btn');
const updateProductsBtn = document.getElementById('update-products-btn');
const createProductsBtn = document.getElementById('create-products-btn');
const deleteProductsBtn = document.getElementById('delete-products-btn');
const productsContainer = document.getElementById('products-container');
const updateFormContainer = document.getElementById('update-form-container');
const createFormContainer = document.getElementById('create-form-container');
const deleteFormContainer = document.getElementById('delete-form-container');
const formUpdate = document.getElementById("update-form");
const formCreate = document.getElementById("create-form");
const formDelete = document.getElementById("delete-form");

//los botones ocultan y muestran los formularios segun la eleccion para manejar los productos
//muesta todos los prductos de la base de datos
getProductsBtn.addEventListener('click', async() => {
  productsContainer.style.display = 'block';
  updateFormContainer.style.display = 'none';
  createFormContainer.style.display = 'none';
  deleteFormContainer.style.display = 'none';
  try {
    
  } catch (error) {
    
  }  

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


formUpdate.addEventListener("submit", event => {
  event.preventDefault()
  const data = new FormData(formUpdate)
  const obj = {}
  data.forEach((value, key) => (obj[key] = value))
  fetch("/products", {
    headers: {
      "content-type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify(obj)
  })
    .then(response => response.json())
    .catch(error => console.log(error))
})


formCreate.addEventListener("submit", async event => {
  event.preventDefault();

  const data = new FormData(formCreate);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));

  try {
    const response = await fetch("/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    if (response.ok) {      
      console.log("Producto creado exitosamente");
      formCreate.reset(); // Restablecer el formulario
    } else {
      // Manejar errores de respuesta
      const errorData = await response.json();
      console.error("Error al crear el producto:", errorData);
    }
  } catch (error) {
    // Manejar errores de red u otros
    console.error("Error de red:", error);
  }
});
