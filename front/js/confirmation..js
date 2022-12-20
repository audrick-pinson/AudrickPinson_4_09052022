const orderId = new URL(window.location.href).searchParams.get('orderId');
// @todo : vérifier que orderId contient bien quelque chose
console.log(orderId);
let tagOrderId = document.getElementById('orderId');
tagOrderId.textContent = orderId;
// @todo : Vider la valeur de cart du LocalStorage

fetch(`http://localhost:3000/api/products/${productId}`)
.then(function(res) {
	if (res.ok) {
		return res.json();
	}
})
.then(function(value) {
	const products = value;
	console.log(products);
	for (let product of products) {
			//console.log(product);

			document.querySelector('.confirmation').innerHTML += `
			<div class="confirmation">
          <p>Commande validée ! <br>Votre numéro de commande est : <span id="orderId"><!-- 65431343444684674 --></span></p>
        </div>`;

	 }
})
.catch(function(err) {
	console.log(err);
});
