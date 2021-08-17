let products = [];
let cart = [];
//mylocstorage =

function getData() {
  fetch("https://evening-island-91230.herokuapp.com/get-Point_of_Sales/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      products = data;
      make_products(data);
    });
}

getData();

function make_products(products) {
  let product_container = document.querySelector("#products-container");
  product_container.innerHTML = "";
  if (products.data == undefined) {
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
  } else {
    products.data.forEach((product) => {
      product_container.innerHTML += `
        <div class = "products">
            <img src="${product.image}" class = "product-image">
            <div class = "product-content"> 
                <h4 class = "product-title"> ${product.product_name}</h4>
                <p class = "product-description"> ${product.description}</p>
                <p class = "product-price">R${product.price} </p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
                <button onclick="deleteProduct(${product.id})"> Delete product</button>
            </div>
            
        </div>
        `;
    });
  }
}

function renderCart(cartItems) {
  let cartContainer = document.querySelector("#cart");
  cartContainer.innerHTML = "";
  if (cartItems.length > 0) {
    cartItems.map((cartItem) => {
      cartContainer.innerHTML += `
      <div class = "products">
            <img src="${cartItem.image}" class = "product-image">
            <div class = "product-content"> 
                <h4 class = "product-title"> ${cartItem.product_name}</h4>
                <p class = "product-description"> ${cartItem.description}</p>
                <p class = "product-price">R${cartItem.price} </p>
                <button class ="revome_cart" onclick="removeItem(${cartItem.id})">Remove item</button>
            </div>
            
        </div>
      
      
      `;
    });
    let totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
    cartContainer.innerHTML += `<h3> Your total is: ${totalPrice} </h3>`;
  } else {
    cartContainer.innerHTML = "<h2> No items in cart</h2>";
  }
}

function addToCart(id) {
  console.log(products.data);
  let product = products.data.find((item) => {
    return item.id == id;
  });

  cart.push(product);
  renderCart(cart);
}

function deleteProduct(id1) {
  let product = products.data.find((item) => {
    return item.id == id1;
  });
  let prod_id = product.id;
  console.log(prod_id);

  fetch("https://evening-island-91230.herokuapp.com/delete-product-front/", {
    method: "POST",
    body: JSON.stringify({
      id: prod_id,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data["message"] == "Product post deleted successfully.") {
        alert("Deleted succesfully");
      } else {
        alert("did not work");
      }
    });

  console.log(product);
  console.log(cart);
}

function removeItem(id) {
  let product = products.data.find((item) => {
    return item.id == id;
  });
  //console.log(product);

  cart.splice(
    cart.findIndex((a) => a.id === product.id),
    1
  );
  renderCart(cart);
}

function searchForProducts() {
  let searchTerm = document.querySelector("#searchTerm").value;
  console.log(searchTerm);
  console.log(products.data);
  let searchedProducts = products.data.filter((product) =>
    product.product_name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );
  console.log(Object.entries(searchedProducts));
  make_products(Object.entries(searchForProducts));
}

const mystorage = window.localStorage;
const myuser = window.localStorage;
const mypass = window.localStorage;
function login() {
  fetch("https://evening-island-91230.herokuapp.com/auth", {
    method: "POST",
    body: JSON.stringify({
      username: document.getElementById("auth_username").value,
      password: document.getElementById("auth_password").value,
      mode: no - cors,
    }),
    headers: {
      "Content-type": "application/json",
      Authorization: `jwt ${mystorage.getItem("jwt-token")}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data["description"] == "Invalid credentials") {
        alert(
          "Username or password is incorrect. Please enter correct details"
        );
      } else {
        console.log(data["access_token"]);
        mystorage.setItem("jwt-token", data["access_token"]);
        myuser.setItem(
          "auth_username",
          document.getElementById("auth_username")
        );
        mypass.setItem(
          "auth_password",
          document.getElementById("auth_password")
        );

        window.location.href = "./products.html";
      }
    });
}

function register() {
  fetch("https://evening-island-91230.herokuapp.com/user-registration/", {
    method: "POST",
    body: JSON.stringify({
      first_name: document.getElementById("first_name").value,
      last_name: document.getElementById("last_name").value,
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      address: document.getElementById("address").value,
      phone_number: document.getElementById("phone_number").value,
      user_email: document.getElementById("user_email").value,
    }),
    headers: {
      "Content-type": "application/json",
      Authorization: `jwt ${mystorage.getItem("jwt-token")}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data["message"] == "success") {
        alert("Registered successfully!, please log in.");
        window.location.href = "./index.html";
      } else {
        alert("Please enter correct information");
      }
    });
}

//

function addtocatalogue() {
  fetch("https://evening-island-91230.herokuapp.com/create-products/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `jwt ${mystorage.getItem("jwt-token")}`,
    },
    body: JSON.stringify({
      prod_name: document.getElementById("prod_name").value,
      price: document.getElementById("price").value,
      description: document.getElementById("description").value,
      image: document.getElementById("image").value,
    }),
  })
    .then((response) => response.json)
    .then((data) => {
      console.log(data);
      console.log("success");
      if (data["description"] == "Product added succesfully") {
        alert("product added successfuly");
        window.location.href = "./products.html";
      } else {
        alert("did not add!, please make sure the information is correct.");
        window.location.href = "./products.html";
      }
    });
}

// Cart

function toggleCart() {
  document.querySelector("#cart").classList.toggle("active");
}

function userInfo() {
  username = document.querySelector("#auth_username").value;
  console.log(username);
  localStorage.setItem("auth_username", JSON.stringify(username));
  password = document.querySelector("#auth_password").value;
  localStorage.setItem("auth_password", JSON.stringify(password));
  console.log(localStorage);
}

function viewUserInfo() {}

// fetch users

function userProfile() {
  fetch(
    "https://evening-island-91230.herokuapp.com/get-user-password/" +
      `${localStorage.getItem("auth_username")}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}
userProfile();

//localStorage.setItem("lastname", "Smith");

//document.getElementById("user_options").innerHTML =
//localStorage.getItem("lastname");

// user info

function userInfo2() {
  fetch(
    "https://lca-pointofsales.herokuapp.com//user-profile/" +
      `${id.getItem("id")}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `jwt ${localStorage.getItem("jwt-token")}`,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)

      let users = data.data;

      console.log(users);

      let container = document.querySelector("#user-container");

      container.innerHTML = "";

      container.innerHTML += `<div class="user-info>
                <div class="image"><img src="./Images/Lifechoices-300x91.jpg" alt="LCA Logo"></div>
                <div class="userID"><h3>User ID:</h3>  ${users[0]}  </div>
                <div class="firstName"><h3>First Name:</h3> ${users[1]}</div>
                <div class="lastName"><h3>Last Name:</h3> ${users[2]}</div>
                <div class="email"><h3>Email:</h3> ${users[3]}</div>
                <div><h3>Phone Number:</h3> ${users[4]}</div>
                <div><h3>Password:</h3> ${users[5]}</div>
                </div>`;
    });
}
