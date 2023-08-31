const socket = io()

socket.on("products", products => {
  const productsContainer = document.getElementById("products-container");

  productsContainer.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
          <h3>${product.title}</h3>
          <img src="${product.thumbnail}" onerror="this.src='/img/noImage.png'" alt="Sin imagen" style="width: 200px; height: 200px;">
          <p>${product.description}</p>
          <span>Price: $ ${product.price}</span>
      `;
    productsContainer.appendChild(card);
  });
});



