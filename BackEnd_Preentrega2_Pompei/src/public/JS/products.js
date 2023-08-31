
const socket = io()

//capturo todos los ID que necesito de products.handlebars
//botones
const getProductsBtn = document.getElementById('get-products-btn');
const updateProductsBtn = document.getElementById('update-products-btn');
const createProductsBtn = document.getElementById('create-products-btn');
const deleteProductsBtn = document.getElementById('delete-products-btn');
const producID = document.getElementById("Product-ID")
const searchButton = document.getElementById("Button-search")
const createBatchProducts = document.getElementById("create-batchProducts-btn");
//containers
const productsContainer = document.getElementById('products-container');
const searchContainer = document.getElementById('search-container');
const updateFormContainer = document.getElementById('update-form-container');
const createFormContainer = document.getElementById('create-form-container');
const deleteFormContainer = document.getElementById('delete-form-container');
const createBatchFormContainer = document.getElementById("create-batch-form-container")
//formularios
const formUpdate = document.getElementById("update-form");
const formCreate = document.getElementById("create-form");
const formDelete = document.getElementById("delete-form");
const formCreateBatch = document.getElementById("create-batch-form")
//inputs
const updateProductID = document.getElementById("update-product-id")
const deleteProductID = document.getElementById("delete-product-id")
const  inputFile = document.getElementById("file-Input")


//los botones ocultan y muestran los formularios segun la eleccion para manejar los productos
//muestra los productos en Real Time con servidor webSockets
getProductsBtn.addEventListener('click', () => {
  window.location.href = ("/realtimeproducts")
});

//muestra el formulario para actualizar productos
updateProductsBtn.addEventListener('click', () => {
  updateFormContainer.style.display = 'block';
  searchContainer.style.display = 'none';
  productsContainer.style.display = 'none';
  createFormContainer.style.display = 'none';
  deleteFormContainer.style.display = 'none';
  createBatchFormContainer.style.display = 'none';
});

//muestra el formulario para crear productos
createProductsBtn.addEventListener('click', () => {
  createFormContainer.style.display = 'block';
  searchContainer.style.display = 'none';
  productsContainer.style.display = 'none';
  updateFormContainer.style.display = 'none';
  deleteFormContainer.style.display = 'none';
  createBatchFormContainer.style.display = 'none';
});

//muestra el formulario para eliminar productos
deleteProductsBtn.addEventListener('click', () => {
  deleteFormContainer.style.display = 'block';
  searchContainer.style.display = 'none';
  productsContainer.style.display = 'none';
  updateFormContainer.style.display = 'none';
  createFormContainer.style.display = 'none';
  createBatchFormContainer.style.display = 'none';
});

//muestra el formulario para Crear productos por Lote
createBatchProducts.addEventListener('click', () => {
  createBatchFormContainer.style.display = 'block';
  deleteFormContainer.style.display = 'none';
  searchContainer.style.display = 'none';
  productsContainer.style.display = 'none';
  updateFormContainer.style.display = 'none';
  createFormContainer.style.display = 'none';
});

// Accion del formulario para crear producto
formCreate.addEventListener("submit", async event => {
  event.preventDefault();
  const data = new FormData(formCreate);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  try {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    if (response.ok) {
      console.log("Producto creado exitosamente");
      formCreate.reset();

      socket.emit("newProduct", obj)
    } else {
      const errorData = await response.json();
      console.log("Error al crear el producto:", errorData);
    }
  } catch (error) {
    console.log("Error de red:", error);
  }
});

//Acccion de Formulario para actualizar
formUpdate.addEventListener("submit", async event => {
  event.preventDefault()
  const data = new FormData(formUpdate)
  const obj = {}  
  data.forEach((value, key) => {
    if(value.trim() !== ""){
      obj[key] = value;
    }    
  });
  try {
    const response = await fetch(`/api/products/${updateProductID.value}`, {      
      headers: {
        "content-type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(obj)
    })
    if (response.ok) {
      console.log("Producto actualizado exitosamente");
      formUpdate.reset();
      
    } else {
      const errorData = await response.json();
      console.log("Error al actualizar el producto:", errorData);
    }
  } catch (error) {
    console.log("Error de red:", error);
  }
})

// Accion formulario para eliminar producto por ID
formDelete.addEventListener("submit", async event => {
  event.preventDefault()  
  console.log(deleteProductID.title)
  try {
    const response = await fetch(`/api/products/${deleteProductID.value}`, {      
      headers: {
        "content-type": "application/json",
      },
      method: "DELETE"      
    })
    if (response.ok) {
      console.log(`"Producto ${deleteProductID.title} eliminado exitosamente"`);
      formDelete.reset();      
    } else {
      const errorData = await response.json();
      console.log("Error al eliminar el producto:", errorData);
    }
  } catch (error) {
    console.log("Error de red:", error);
  }
})

formCreateBatch.addEventListener("submit", async event=>{
  event.preventDefault()
  const file = inputFile.files[0]
  const formData = new FormData()
  formData.append("productsFile",file)
  try {
    const response = await fetch("/api/products/manyProducs",{
      headers: {
        "content-type": "application/json",
      },
      method: "POST" ,
      body: formData
    })
  } catch (error) {
    console.log(error)
  }
})

searchButton.addEventListener("click", async()=>{
  const productsContainer = document.getElementById("products-container")
  producID.innerHTML="";
  productsContainer.style.display = 'block'  
  console.log(producID.value);
  try {
    const response = await fetch(`/api/products/${producID.value}`)
    const productData = await response.json()
    console.log(productData);
            
    productData.forEach(product => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.classList.add("col-md-8");
      card.classList.add("m-3");
      card.innerHTML = `
            <h3>${product.title}</h3>
            <img src="${product.thumbnail}" onerror="this.src='/img/noImage.png'" alt="Sin imagen" style="width: 200px; height: 200px;">
            <p>${product.description}</p>
            <span>Price: $ ${product.price}</span>
        `;
      productsContainer.appendChild(card);
    })    
  } catch (error) {
    console.log(`error al obtener el producto ${error}`);
  }
})