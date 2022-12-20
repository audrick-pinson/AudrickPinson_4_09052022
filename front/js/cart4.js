// On récupère les produits du panier depuis le localstorage
let cart = localStorage.getItem("cart");
let productsCart = JSON.parse(cart);

let cartProductsPriceTotal = 0;
let cartProductsQuantityTotal = 0;

// Pour chacun des produits de mon panier, je veux afficher le HTML
for(let productCart of productsCart) {
	// Pour afficher les informations HTMLs manquantes, je dois les récupérer depuis l'API
	fetch(`http://localhost:3000/api/products/${productCart.productId}`)
	.then(function(res) {
		if(res.ok) {
			return res.json();
		}
	})
	.then(function(value) {
		const product = value;
		// Je construis le HTML permettant d'afficher chacun de mes produits à partir des informations récupérées de l'API.

		// <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
		const myCartItem = document.createElement('article');
		myCartItem.setAttribute('data-id', product._id );
		myCartItem.setAttribute('data-color', productCart.color);
		myCartItem.setAttribute('class', 'cart__item');
		document.querySelector('#cart__items').appendChild(myCartItem);

		// <div class="cart__item__img">
		const myElementDivImg = document.createElement('div');
		myElementDivImg.setAttribute('class', 'cart__item__img');

		// <img src="../images/product01.jpg" alt="Photographie d'un canapé">
		const myElementImg = document.createElement('img');
		myElementImg.setAttribute('src', product.imageUrl);
		myElementImg.setAttribute('alt', product.altTxt);
		myElementDivImg.appendChild(myElementImg);
		myCartItem.appendChild(myElementDivImg);

		// <div class="cart__item__content">
		const myElementDivItemContent = document.createElement('div');
		myElementDivItemContent.setAttribute('class', 'cart__item__content');
		myCartItem.appendChild(myElementDivItemContent);

		// <div class="cart__item__content__description">
		const myElementDivItemContentDescription = document.createElement('div');
		myElementDivItemContentDescription.setAttribute('class', 'cart__item__content__description');
		myElementDivItemContent.appendChild(myElementDivItemContentDescription);

		// <h2>Nom du produit</h2>
		const myElementName = document.createElement('h2');
		myElementName.textContent = product.name;
		myElementDivItemContentDescription.appendChild(myElementName);

		// <p>Vert</p>
		const myElementColor = document.createElement('p');
		myElementColor.textContent = productCart.color;
		myElementDivItemContentDescription.appendChild(myElementColor);

		// <p>42,00 €</p>
		const myElementPrice = document.createElement('p');
		myElementPrice.textContent = `${product.price}€`;
		myElementDivItemContentDescription.appendChild(myElementPrice);

		// <div class="cart__item__content__settings">
		const myElementDivItemContentSettings = document.createElement('div');
		myElementDivItemContentSettings.setAttribute('class', 'cart__item__content__settings');
		myElementDivItemContent.appendChild(myElementDivItemContentSettings);

		// <div class="cart__item__content__settings__quantity">
		const myElementDivItemContentSettingsQuantity = document.createElement('div');
		myElementDivItemContentSettingsQuantity.setAttribute('class', 'cart__item__content__settings__quantity');
		myElementDivItemContentSettings.appendChild(myElementDivItemContentSettingsQuantity);

		// <p>Qté : </p>
		const myElementQuantityP = document.createElement('p');
		myElementQuantityP.textContent = "Qté : ";
		myElementDivItemContentSettingsQuantity.appendChild(myElementQuantityP);

		// <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
		const myElementQty = document.createElement('input');
		myElementQty.setAttribute('min', 1);
		myElementQty.setAttribute('max', 100);
		myElementQty.setAttribute('name', "itemQuantity");
		myElementQty.setAttribute('class', "itemQuantity");
		myElementQty.setAttribute('type', "number");
		myElementQty.setAttribute('value', productCart.qty);
		myElementDivItemContentSettingsQuantity.appendChild(myElementQty);
		myElementQty.addEventListener('change', function() {
			// Récupérer le panier et les produits contenus
			let cart = getCart();
			// Chercher et trouver le produit dont il faut modifier la quantité
			let index = cart.findIndex(item => ((productCart.productId === item.productId) && (productCart.color === item.color)));
			console.log(index);
			// Modifier la quantité
			if(index !== -1) {
				cart[index].qty = myElementQty.value;
				// Sauvegarder le panier modifié dans le localStorage
				localStorage.setItem('cart', JSON.stringify(cart));
				// Rafraichir la page
				location.reload();
			}
		});

		// <div class="cart__item__content__settings__delete">
		const myElementDivItemContentSettingsDelete = document.createElement('div');
		myElementDivItemContentSettingsDelete.setAttribute('class', 'cart__item__content__settings__delete');
		myElementDivItemContentSettings.appendChild(myElementDivItemContentSettingsDelete);

		// <p class="deleteItem">Supprimer</p>
		const myElementDeleteItem = document.createElement('p');
		myElementDeleteItem.textContent = "Supprimer";
		myElementDeleteItem.setAttribute('class', "deleteItem");
		myElementDivItemContentSettingsDelete.appendChild(myElementDeleteItem);
		myElementDeleteItem.addEventListener('click', function() {
			// Récupérer le panier et les produits contenus
			let cart = getCart();
			// Chercher et trouver le produit dont il faut modifier la quantité
			let index = cart.findIndex(item => ((productCart.productId === item.productId) && (productCart.color === item.color)));
			console.log(index);
			// Supprimer la case du tableau
			if(index !== -1) {
				cart.splice(index, 1);
				//cart = cart.filter(item => ((productCart.productId !== item.productId) && (productCart.color !== item.color)));
				// Sauvegarder le panier modifié dans le localStorage
				localStorage.setItem('cart', JSON.stringify(cart));
				// Rafraichir la page
				location.reload();
			}
		});

		// calcul prix total
		const totalPrice = document.getElementById("totalPrice");
		cartProductsPriceTotal = cartProductsPriceTotal + (product.price *= productCart.qty);
		totalPrice.textContent = cartProductsPriceTotal;

		// Afficher le nombre total de produits
		const totalQuantity = document.getElementById("totalQuantity");
		cartProductsQuantityTotal = cartProductsQuantityTotal + Number(productCart.qty);
		totalQuantity.textContent = cartProductsQuantityTotal;

	})
	.catch(function(err) {
		console.log(err);
	});
}


// Détecter l'envoi du formulaire de commande
let orderBtn = document.getElementById("order");
orderBtn.addEventListener("click", function(event) {
	event.preventDefault();

	// -- Récupérer les données du formulaire
	let contactData = {
		firstName: document.getElementById("firstName").value,
		lastName: document.getElementById("lastName").value,
		address: document.getElementById("address").value,
		city: document.getElementById("city").value,
		email: document.getElementById("email").value,
	};

	// -- Analyser / Vérifier les données du formulaire
	// -- -- À faire plus tard !

	// -- Faire un tableau des IDs des produits contenu dans le panier
	let cartTmp = getCart();
	let productsIds = [];
	for(let item of cartTmp) {
		productsIds.push(item.productId)
	}

	// -- Envoyer le formulaire au backend via un fetch POST
	fetch("http://localhost:3000/api/products/order", {
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			contact: contactData,
			products: productsIds,
		}),
	})
	.then(function(res) {
		if (res.ok) {
			return res.json();
		}
	})
	.then(function(res) {
		// -- Récupérer la réponse du fetch (qui contiendra le orderId)
		console.log(res.orderId);
		// -- Rediriger l'utilisateur sur la page confirmation.html?orderId=4567897654567 en passant en paramètre le orderId
	})
	.catch(function(err) {
		console.log(err);
	});
});


function validateForm() {
	let firstNameInput = document.getElementById('firstName');
	let firstNameError = document.getElementById('firstNameErrorMsg');

	let firstNameRegex = new RegExp("^[a-zA-ZA-]+$");
	if(firstNameRegex.test(firstNameInput.value)) {
	}
	else {
		firstNameError.textContent = "le prenom est invalide";
		isValid = false;

	}
}

function validateForm() {
	let lastNameInput = document.getElementById('lastName');
	let lastNameError = document.getElementById('lastNameErrorMsg');

	let lastNameRegex = new RegExp("^[a-zA-ZA-]+$");
	if(lastNameRegex.test(lastNameInput.value)) {
	}
	else {
		lastNameError.textContent = "le nom est invalide";
		isValid = false;

	}
}

function validateForm() {
	let adressInput = document.getElementById('adress');
	let adressError = document.getElementById('adressErrorMsg');

	let adressRegex = new RegExp("^[a-zA-Z0-9A- ,'-]+$");
	if(adressRegex.test(adressInput.value)) {
	}
	else {
		adressError.textContent = "l'adresse' est invalide";
		isValid = false;

	}
}

function validateForm() {
	let cityInput = document.getElementById('ville');
	let cityError = document.getElementById('villeErrorMsg');

	let cityRegex = new RegExp("^[a-zA-ZA- ,'-]+$");
	if(cityRegex.test(cityInput.value)) {
	}
	else {
		cityError.textContent = "la ville est invalide";
		isValid = false;

	}
}

function validateForm() {
	let emailInput = document.getElementById('email');
	let emailError = document.getElementById('emailErrorMsg');

	let emailRegex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]$");
	if(emailRegex.test(emailInput.value)) {
	}
	else {
		emailError.textContent = "l'email' est invalide";
		isValid = false;

	}
}



/*
		//confirmation formulaire de commande
		document.getElementById("confirmation").addEventListener("submit", function() {
			.....preventDefault();
			let erreur;
			let prenom = document.getElementById("firstName");
			let prenom = document.getElementById("lastName");
			let prenom = document.getElementById("address");
			let prenom = document.getElementById("city");
			let prenom = document.getElementById("email");

			if document.getElementById("firstName").value == ""{
				erreur('veuillez remplir le champs')
			}

			if document.getElementById("lastName").value == ""{
				erreur('veuillez remplir le champs')
			}

			if document.getElementById("address").value == ""{
				erreur('veuillez remplir le champs')
			}

			if document.getElementById("city").value == ""{
				erreur('veuillez remplir le champs')
			}

			if document.getElementById("email").value == ""{
				erreur('veuillez remplir le champs')
			}

			if (erreur) {
				...preventDefault();
				document.getElementById("erreur").textContent = erreur
				return false;
			}
			else{
				alert('votre commande à bien été enregistrer !');
			}
		})
*/