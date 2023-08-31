const producID = document.getElementById("Product-ID")
const searchButton = document.getElementById("Button-search")

document.addEventListener("DOMContentLoaded", async () => {
  const productsContainer = document.getElementById("products-container")
  productsContainer.innerHTML = "";
  try {
    const response = await fetch("/products");
    const products = await response.json()       
    products.forEach(product => {
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
    console.log('Error al obtener los productos:', error);
  }
})

searchButton.addEventListener("click", async()=>{
  const productsContainer = document.getElementById("products-container")
  producID.innerHTML="";
  productsContainer.innerHTML = "";
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