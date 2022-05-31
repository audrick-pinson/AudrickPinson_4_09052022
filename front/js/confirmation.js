fetch(`http://localhost:3000/api/products/${productId}`)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })

  
  .then(function(value) {
  	const product = value;
    console.log(product);
        
        //insertion nom du produit et le prix de celui-ci
        document.querySelector('.confirmation').innerHTML += `<div>
              <span id="orderId">${productId}</span>
        </div>`;
  })
    .catch(function(err) {
    console.log(err);
  });
