const socket = io();
// Escuchar el evento "newProduct" desde el servidor
socket.on("newProduct", product => {
  location.reload();
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Cargar datos desde el archivo JSON
    const response = await fetch("/api/products");
    console.log(response);
    const products = await response.json();

    // Obtener el contenedor de productos
    const productContainer = document.getElementById("productContainer");

    // Generar una tarjeta para cada producto
    products.forEach(product => {
      const card = createProductCard(product);
      productContainer.appendChild(card);
    });
    
  } catch (error) {
    console.error("Error al cargar los productos:", error);
  }
});

// Función para crear una tarjeta de producto
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "card";

  const title = document.createElement("h2");
  title.className = "title";
  title.textContent = product.title;

  const description = document.createElement("p");
  description.className = "description";
  description.textContent = product.description;

  const price = document.createElement("p");
  price.className = "price";
  price.textContent = `Precio: $${product.price}`;

  const stock = document.createElement("p");
  stock.className = "stock";
  stock.textContent = `Stock: ${product.stock}`;

  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(price);
  card.appendChild(stock);

  return card;
}