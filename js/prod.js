function loadcart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartList = document.getElementById("cart-items");
    let total = 0;

    cartList.innerHTML = "";

    if (cart.length === 0) {
        cartList.innerHTML = `<tr><td colspan="5">Your cart is empty.</td></tr>`;
        document.getElementById('cart-total').textContent = "0";
        document.getElementById("clear-cart").disabled = true;
        return;
    }

    document.getElementById("clear-cart").disabled = false;

    cart.forEach((item, index) => {
        const quantity = item.quantity || 1;
        const itemTotal = item.price * quantity;
        total += itemTotal;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.productName}</td>
            <td>₹${item.price.toLocaleString()}</td>
            <td>
                <input type="number" min="1" value="${quantity}" class="qty-input" data-index="${index}">
            </td>
            <td class="item-total" data-index="${index}">₹${itemTotal.toLocaleString()}</td>
            <td><button class="remove-btn" data-index="${index}">Remove</button></td>
        `;
        cartList.appendChild(row);
    });

    document.getElementById('cart-total').textContent = total.toLocaleString();

    // Set up remove buttons
    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            loadcart();
        });
    });

    // Set up quantity inputs
    document.querySelectorAll(".qty-input").forEach(input => {
        input.addEventListener("change", (e) => {
            const index = e.target.dataset.index;
            let newQty = parseInt(e.target.value);

            if (isNaN(newQty) || newQty < 1) {
                newQty = 1;
                e.target.value = 1;
            }

            cart[index].quantity = newQty;
            localStorage.setItem("cart", JSON.stringify(cart));
            loadcart(); // Reload to update prices and totals
        });
    });
}

// Load cart and setup clear button
document.addEventListener("DOMContentLoaded", () => {
    loadcart();

    document.getElementById("clear-cart").addEventListener("click", () => {
        if (confirm("Are you sure you want to clear your cart?")) {
            localStorage.removeItem("cart");
            loadcart();
        }
    });
});
