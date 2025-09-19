function addtocart(productName, price) {
    
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

   const exitingitem=cart.findIndex(item=>item.productName===productName)
   if (exitingitem!==-1){
    cart[exitingitem].quantity=(cart[exitingitem].quantity || 1)+1
  }
  else{
    cart.push({productName,price,quantity:1})
  }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount()

    alert("Added to cart!");
}
function updateCartCount(){
    const cart = JSON.parse(localStorage.getItem("cart"))||[];
    const totalItems=cart.reduce((sum,item)=>sum + (item.quantity || 1), 0 );
    document.getElementById("cart-count").textContent=totalItems;
}
