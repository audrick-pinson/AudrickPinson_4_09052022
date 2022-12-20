const orderId = new URL(window.location.href).searchParams.get('orderId');
// @todo : vérifier que orderId contient bien quelque chose
console.log(orderId);
let tagOrderId = document.getElementById('orderId');
tagOrderId.textContent = orderId;
// @todo : Vider la valeur de cart du LocalStorage
//cleaner la page apres validation
localStorage.clear();