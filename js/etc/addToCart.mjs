export function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

export function addToCart(gameToAdd) {
    let cart = getCart();
    const itemIndex = cart.findIndex((item) => item.id === gameToAdd.id);
  
    if (itemIndex > -1) {
        // Increment quantity for existing item
        cart[itemIndex].quantity += 1;
    } else {
        // Add new item with quantity initialized to 1
        cart.push({ ...gameToAdd, quantity: 1 });
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
    // Optionally, trigger an update to the checkout page or cart display
}

export function removeFromCart(gameIdToRemove) {
    let cart = getCart();
    const itemIndex = cart.findIndex((item) => item.id === gameIdToRemove);
  
    if (itemIndex > -1) {
        if (cart[itemIndex].quantity > 1) {
            // Decrement quantity for existing item
            cart[itemIndex].quantity -= 1;
        } else {
            // Remove item from cart if quantity is 1
            cart.splice(itemIndex, 1);
        }
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
    // Optionally, trigger an update to the checkout page or cart display
}

export function clearCart() {
    localStorage.setItem('cart', JSON.stringify([]));
    // Optionally, trigger an update to the checkout page or cart display
}

export function getTotalNumberOfItemsInCart() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
}

export function getCartTotalPrice() {
    const cart = getCart();
    return cart.reduce((total, item) => {
        const itemTotalPrice = item.price * item.quantity;
        return total + itemTotalPrice;
    }, 0);
}
