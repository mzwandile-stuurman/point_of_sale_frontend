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

function login() {
  fetch("https://evening-island-91230.herokuapp.com/auth", {
    method: "POST",
    body: JSON.stringify({
      username: document.getElementById("auth_username").value,
      password: document.getElementById("auth_password").value,
    }),
    headers: {
      "Content-type": "application/json",
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

//function previewFile() {
//image = document.querySelector(".imageup");
//const file = document.querySelector("#image").files[0];
//const reader = new FileReader();

//reader.addEventListener(
//"load",
//function () {
// convert image file to base64 string
//image.src = reader.result;
//},
//false
//);

//if (file) {
//reader.readAsDataURL(file);
//console.log(reader.readAsDataURL(file));
//}
//}

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
  firstname = document.querySelector("#first_name").value;
  localStorage.setItem("Firstname", JSON.stringify(firstname));
  lastname = document.querySelector("#last_name").value;
  localStorage.setItem("Lastname", JSON.stringify(lastname));
  username = document.querySelector("#username").value;
  localStorage.setItem("Username", JSON.stringify(username));
  password = document.querySelector("#password").value;
  localStorage.setItem("Password", JSON.stringify(password));
  address = document.querySelector("#address").value;
  localStorage.setItem("Address", JSON.stringify(address));
  lastname = document.querySelector("#last_name").value;
  localStorage.setItem("Lastname", JSON.stringify(lastname));
  phone_number = document.querySelector("#phone_number").value;
  localStorage.setItem("Phonenumber", JSON.stringify(phone_number));
  user_email = document.querySelector("#user_email").value;
  localStorage.setItem("email", JSON.stringify(user_email));

  user_log = document.querySelector("#auth_username").value;
  

  var i;
  console.log("local storage");
  for (i = 0; i < localStorage.length; i++) {
    console.log(
      localStorage.key(i) +
        "=[" +
        localStorage.getItem(localStorage.key(i)) +
        "]"
    );
  }
  console.log(localStorage);
}
userInfo();

function viewUserInfo() {}

// fetch users

function userProfile() {
  fetch("https://evening-island-91230.herokuapp.com/get-users/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}
userProfile();

//localStorage.setItem("lastname", "Smith");

//document.getElementById("user_options").innerHTML =
//localStorage.getItem("lastname");
