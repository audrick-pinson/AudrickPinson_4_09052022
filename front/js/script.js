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
        console.log(product);
        console.log(product.name);
        console.log(product.price);
        console.log(product.colors);
        console.log(product.description);
        console.log(product.imageUrl);
        console.log(product._id);
        //insere chaque element dans la page d'acceuil
        document.querySelector('.items').innerHTML += `<div>
        ${product.imageUrl}
        ${product.name}
        ${product.price}
        ${product.colors}
        ${product.name}
        ${product.description}
        </div>`; 
        //affichage image sur le page du site
        
         //console.log['url(.../back/images']

         //const kanap01_imageUrl = <img src="${product.imageUrl}">

         //let img = document.createElement ("img");
         //img.src = ".../back/images/kanap01.jpeg"
        
    }
  })
  .catch(function(err) {
    console.log(err);
  });

  let


