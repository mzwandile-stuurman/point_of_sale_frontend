let products = [];
let cart = [];

fetch("https://evening-island-91230.herokuapp.com/get-Point_of_Sales/")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    products = data;
    make_products(data);
  });

function make_products(products) {
  let product_container = document.querySelector("#products-container");
  product_container.innerHTML = "";
  products.data.forEach((product) => {
    product_container.innerHTML += `
    <div class = "products">
        <img src="${product.image}" class = "product-image">
        <div class = "product-content"> 
            <h4 class = "product-title"> ${product.product_name}</h4>
            <p class = "product-description"> ${product.description}</p>
            <p class = "product-price">R${product.price} </p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        
        </div>
        
    </div>
    `;
  });
}

function addToCart(id) {
  let product = products.data.find((item) => {
    return (item.id = id);
  });
  console.log(product);
  cart.push(product);
  console.log(cart);
}

function searchForProducts() {
  let searchTerm = document.querySelector("#searchTerm").value;
  console.log(searchTerm);
  let searchedProducts = products.data.filter((product) =>
    product.product_name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );
  console.log(searchedProducts);
  make_products(searchedProducts);
}
