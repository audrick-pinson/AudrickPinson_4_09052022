//console.log('hello');

// Fonction permettant de récupérer le contenu du cart depuis le localstorage // let cart = getCart();
function getCart() {
	let cart = [];
	let cartLS = localStorage.getItem("cart");
	if(cartLS !== null) {
		cart = JSON.parse(cartLS);
	}
	return cart;
}

// Fonction permettant de sauvegarder le contenu du cart dans le localstorage // saveCart(cart);
function saveCart(cart = []) {
	localStorage.setItem("cart", JSON.stringify(cart));
}

// Fonction permettant de récupérer un paramètre d'url // let value = getUrlParam(paramName);
function getUrlParam(paramName = '') {
	const value = new URL(window.location.href).searchParams.get(paramName);
	return value;
}

// Fonction permettant de trouver un produit dans le panier // let index = findProductFromCart(productId, productColor);
function findProductFromCart(productId = '', productColor = '') {
	let cart = getCart();
	let index = cart.findIndex(item => ((productId === item.productId) && (productColor === item.color)));
	return index;
}

// Fonction permettant de ajouter un produit dans le panier // addProductToCart(productId, productColor, quantity);
function addProductToCart(productId = '', productColor = '', quantity = 0) {
	let cart = getCart();
	// Chercher et trouver le produit dont il faut modifier la quantité
	let index = findProductFromCart(productId, productColor);
	if(index !== -1) {
		cart[index].qty = Number(cart[index].qty) + Number(quantity);
	}
	else {
		let productData = {
			'productId' : productId,
			'color' : productColor,
			'qty' : Number(quantity),
		};
		cart.push(productData);
	}
	saveCart(cart);
}

// Fonction permettant de modifier un produit dans le panier // let index = addProductToCart(productId, productColor, quantity);
function updateProductQuantityFromCart(productId = '', productColor = '', quantity = 0) {
	// @todo
	let cart = getCart();
	let index = findProductFromCart(productId, productColor);
	if (index !== -1){
		//ajouter de la quantite
		cart[index].qty = Number(quantity);
		saveCart(cart);
	}

}

// Fonction permettant de supprimer un produit dans le panier // let index = deleteProductToCart(productId, productColor);
function deleteProductToCart(productId = '', productColor = '') {
	// @todo
	let cart = getCart();
	let index = findProductFromCart(productId, productColor);
	if (index !== -1){
		cart.splice(index, 1);
		saveCart(cart);
	}

}
