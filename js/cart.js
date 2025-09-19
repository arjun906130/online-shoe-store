// Update cart display
function updateCart() {
    let cartList = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");

    // clear old items
    cartList.innerHTML = "";

    // add all items again
    cart.forEach((item) => {
        let li = document.createElement("li");
        li.textContent = `${item.name} - ₹${item.price}`;
        cartList.appendChild(li);
    });

    
    cartTotal.textContent = total;
}

// Clear cart
function clearCart() {
    cart = [];
    total = 0;
    updateCart();
}
