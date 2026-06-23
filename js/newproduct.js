function addtocart(productName, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.findIndex(item => item.productName === productName);
    if (existingItem !== -1) {
        cart[existingItem].quantity = (cart[existingItem].quantity || 1) + 1;
    } else {
        cart.push({ productName, price, quantity: 1 });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    // Show custom notification instead of alert
    showToast(`${productName} added to cart!`);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const cartBadge = document.getElementById("cart-count");
    if (cartBadge) {
        cartBadge.textContent = totalItems;
        // Animation effect for badge
        cartBadge.classList.remove('pulse');
        void cartBadge.offsetWidth; // trigger reflow
        cartBadge.classList.add('pulse');
    }
}

function showToast(message) {
    // Remove existing toasts
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
        <i class="fas fa-check-circle" style="color: #f5c518"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(toast);

    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}
