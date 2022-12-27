// En JS, commencez par requêter l’API pour lui demander l’ensembledes produits ; récupérer la réponse émise, et parcourir celle-ci pourinsérer chaque élément (chaque produit) dans la page d’accueil(dans le DOM).

fetch("http://localhost:3000/api/products")
.then(function(res) {
	if (res.ok) {
		return res.json();
	}
})
.then(function(value) {
	const products = value;
	console.log(products);
	if(products.length === 0) {
		document.querySelector('.items').textContent = "Aucun produit disponible";
	}
	else {
		for (let product of products) {

			// insere chaque element dans la page d'acceuil

			// <a>
			const tagA = document.createElement('a');
			tagA.setAttribute('href', `./product.html?id=${product._id}`);
			document.querySelector('.items').appendChild(tagA);

			// <article>
			const tagArticle = document.createElement('article');
			tagA.appendChild(tagArticle);

			// <img>
			const tagImage = document.createElement('img');
			tagImage.setAttribute('src', product.imageUrl);
			tagImage.setAttribute('alt', product.altTxt);
			tagArticle.appendChild(tagImage);

			// <h3>
			const tagH3 = document.createElement('h3');
			tagH3.setAttribute('class', 'productName');
			tagH3.textContent = product.name;
			tagArticle.appendChild(tagH3);

			// <p>
			const tagP = document.createElement('p');
			tagP.setAttribute('class', 'productDescription');
			tagP.textContent = product.description;
			tagArticle.appendChild(tagP);
		}
	}
})
.catch(function(err) {
	console.log(err);
	document.querySelector('.items').textContent = "Aucun produit disponible";
});
