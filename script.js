fetch("https://evening-island-91230.herokuapp.com/get-Point_of_Sales/")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    make_products(data);
  });

function make_products(products) {
  let product_container = document.querySelector("#products-container");
  product_container.innerHTML = "";
  products.data.forEach((product) => {
    product_container.innerHTML += `
    <div class = "products">
        <img src="${product.image}" class = "product-image">
        <h4 class = "product-title"> ${product.product_name}</h4>
        <p class = "product-description"> ${product.description}</p>
        <p class = "product-price">R${product.price} </p>
    </div>
    `;
  });
}
