//console.log('hello');

// let cart = getCart();
function getCart() {
	let cart = [];
	let cartLS = localStorage.getItem("cart");
	if(cartLS !== null) {
		cart = JSON.parse(cartLS);
	}
	return cart;
}
