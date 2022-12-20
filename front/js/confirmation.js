let orderId = getUrlParam('orderId');
console.log(orderId);
if(orderId === undefined || orderId === null || orderId === '') {
	// On affiche un message d'erreur
	document.querySelector('.confirmation').textContent = "Commande introuvable";
}
else {
	// On affiche le orderId dans la page
	let tagOrderId = document.getElementById('orderId');
	tagOrderId.textContent = orderId;
	// On supprime le contenu du panier
	saveCart([]);
}