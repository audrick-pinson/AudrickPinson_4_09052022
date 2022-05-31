console.log("coucou");
//En JS, commencez par requêter l’API pour lui demander l’ensembledes produits ; récupérer la réponse émise, et parcourir celle-ci pourinsérer chaque élément (chaque produit) dans la page d’accueil(dans le DOM).

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
        document.querySelector('.items').innerHTML += `<div>
        <a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>
        </div>`; 
      }
  })
  .catch(function(err) {
    console.log(err);
  });



