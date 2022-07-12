const productId = new URL(window.location.href).searchParams.get('id');
console.log(productId);

fetch(`http://localhost:3000/api/products/${productId}`)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
  	const product = value;
    console.log(product);
        //insere chaque element dans la page d'acceuil
        document.querySelector('.item__img').innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;

        //insertion nom du produit et le prix de celui-ci
        document.querySelector('#title').innerHTML = `${product.name}`;

        document.querySelector('#price').innerHTML = `${product.price}`;

        //insertion descriptif de celui ci
        document.querySelector('#description').innerHTML = `${product.description}`;  


        //inserer color
        console.log(product.colors);
        for (let color of product.colors) {
          document.querySelector('#colors').innerHTML += `<option value=${color}>${color}</option>`;
        }

      //donnée englobant le boutton ajouter au panier
      let addToCart = document.getElementById('addToCart');
      addToCart.addEventListener('click', function( ) {
        let color = document.getElementById('colors').value;
        let qty = document.getElementById('quantity').value;
        let productData = {  
          'productId' : productId,
          'color' : color,
          'qty' : qty,
        };

        let cart = JSON.parse(localStorage.getItem("cart"));
        if (cart === null) cart = [];
        cart.push(productData);
        localStorage.setItem("cart", JSON.stringify(cart));
      });    

  })
    .catch(function(err) {
    console.log(err);
  });

