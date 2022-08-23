
//recup panier
 let cart = localStorage.getItem("cart")
 let productsCart = JSON.parse(cart)

console.log(productsCart);

let productIds = [];
for( let product of productsCart) {
 console.log(product.productId)
}

// //traitement du local storage
fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })  
  .then(function(value) {
    const products = value;
    console.log(products);
    for (let product of products) {
        //insere chaque element dans la page d'acceuil
        document.querySelector('#cart__items').innerHTML >= `<div>  
        <article class="cart__item" data-id="${product._id}" data-color="${product.color}">
                <div class="cart__item__img">
                  <img src="${product.imageUrl}" alt="${product.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>${product.color}</p>
                    <p>${product.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.qty}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
        </div>`; 
      }
     const local = JSON.parse(localStorage.getItem("productData"));

     let "#order" = true;
      if productsCarts = [ qtyCards + colorCards];
      else{
      	console.log("Alerte, la commande ne peut se poursuivre!");
      	if (colorCarts&qtyCarts) = ( != > 0 )
      }

     bouton.onclick = ("#order") => {
      localStorage.getItem("productId",productId.value);
      localStorage.getItem("color",color.value);
      localStorage.getItem("qty",qty.value);

     }

     //bouton supprimer
     localStorage.removeItem("productId");

     //vider le local
     localStorage.clear("cart");

  })
  .catch(function(err) {
    console.log(err);
  });