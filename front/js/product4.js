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
	const tagImage = document.createElement('img');
	tagImage.setAttribute('src', product.imageUrl);
	tagImage.setAttribute('alt', product.altTxt);
	document.querySelector('.item__img').appendChild(tagImage);

	//insertion nom du produit et le prix de celui-ci
	document.querySelector('#title').textContent = product.name;
	document.querySelector('#price').textContent = product.price;

	//insertion descriptif de celui ci
	document.querySelector('#description').textContent = product.description;

	//inserer color
	console.log(product.colors);
	for (let color of product.colors) {
		const tagOption = document.createElement('option');
		tagOption.setAttribute('value', color);
		tagOption.textContent = color;
		document.querySelector('#colors').appendChild(tagOption);
	}

	//donnée englobant le boutton ajouter au panier
	let addToCart = document.getElementById('addToCart');
	addToCart.addEventListener('click', function(event) {
		let color = document.getElementById('colors').value;
		let qty = document.getElementById('quantity').value;
		let productData = {
			'productId' : productId,
			'color' : color,
			'qty' : qty,
		};
		//creation signale d'alerte si le produit ne comprend ni la quantité ni la couleur désignés
		if(qty > 0 && qty <= 100 && color !== '') {
			let cart = JSON.parse(localStorage.getItem("cart"));
			if (cart === null) cart = [];
			cart.push(productData);
			localStorage.setItem("cart", JSON.stringify(cart));
			alert("Produit ajouté au panier");
		}
		else {
			alert("Merci de saisir une quantité supérieur à zéro et de choisir une couleur");
		}
	});
})
	.catch(function(err) {
	console.log(err);
});
