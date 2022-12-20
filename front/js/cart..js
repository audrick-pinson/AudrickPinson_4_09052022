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
			alert('cet article a bien été supprimé !');
			// Récupérer le panier et les produits contenus
			// Chercher et trouver le produit à supprimer
				// MEMO :
				// -- Supprimer un produit du panier
				// -- -- Récupère le productId et le productColor du produit à supprimer
				// -- -- Parcourir toutes les cases du tableau du localStorage (FOR...)
				// -- -- -- Pour chacune des cases du tableau, regarder
				// -- -- -- -- SI (le productId est égal à celui recherché)
				// -- -- -- -- -- ET
				// -- -- -- -- SI (le productColor est égal à celui recherché)
				// -- -- -- -- ALORS
				// -- -- -- -- -- Supprimer la case du tableau
			// Supprimer le produit en question du panier
			// Sauvegarder le panier modifié dans le localStorage
			//localStorage.setItem("cart", JSON.stringify(cart));
			// Rafraichir la page
			//location.reload();
		});

		// calcul prix total
		const totalPrice = document.getElementById("totalPrice");
		cartProductsPriceTotal = cartProductsPriceTotal + (product.price *= productCart.qty);
		totalPrice.textContent = cartProductsPriceTotal;

		// Afficher le nombre total de produits
		const totalQuantity = document.getElementById("totalQuantity");
		cartProductsQuantityTotal = cartProductsQuantityTotal + Number(productCart.qty);
		totalQuantity.textContent = cartProductsQuantityTotal;


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

	})
	.catch(function(err) {
		console.log(err);
	});
}