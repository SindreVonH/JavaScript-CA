import { addToCart, removeFromCart, getCart, clearCart, getTotalNumberOfItemsInCart, getCartTotalPrice } from '../etc/addToCart.mjs';

// Generating html for checkoutPage
function generateHtmlForGame(game) {
  const gameWrapper = document.createElement('div');
  gameWrapper.className = 'game-wrapper';

  const gameImage = document.createElement('img');
  gameImage.src = game.image.url;
  gameImage.alt = game.image.alt || "Game image";
  gameWrapper.appendChild(gameImage);

  const gameTitle = document.createElement('h3');
  gameTitle.textContent = game.title;
  gameWrapper.appendChild(gameTitle);

  const gameQuantity = document.createElement('p');
  gameQuantity.textContent = `Quantity: ${game.quantity}`;
  gameWrapper.appendChild(gameQuantity);

  const gamePrice = document.createElement('p');
  gamePrice.textContent = `Price: ${game.price}$`;
  gameWrapper.appendChild(gamePrice);

  const incrementButton = document.createElement('button');
  incrementButton.textContent = '+';
  incrementButton.addEventListener('click', () => {
      addToCart(game);
      renderCheckoutPage();
  });
  gameWrapper.appendChild(incrementButton);

  const decrementButton = document.createElement('button');
  decrementButton.textContent = '-';
  decrementButton.addEventListener('click', () => {
      removeFromCart(game.id);
      renderCheckoutPage();
  });
  gameWrapper.appendChild(decrementButton);

  return gameWrapper;
}

function displayCartInformation() {
  const cartSummaryContainer = document.createElement('div');
  cartSummaryContainer.id = 'cart-summary';
  
  // Clear Cart Button
  const clearCartButton = document.createElement('button');
  clearCartButton.textContent = 'Clear Cart';
  clearCartButton.addEventListener('click', () => {
      clearCart();
      renderCheckoutPage(); // Refresh checkout page display
  });
  cartSummaryContainer.appendChild(clearCartButton);

  // Total Price
  const totalPriceText = document.createElement('p');
  const totalPrice = getCartTotalPrice();
  totalPriceText.textContent = `Total Price: ${totalPrice.toFixed(2)}$`;
  cartSummaryContainer.appendChild(totalPriceText);

  
  const buyButton = document.createElement('button');
  buyButton.textContent = 'Buy Now';
  buyButton.addEventListener('click', () => {
    // Clear the cart
    localStorage.removeItem("cart");

    // Navigate to the confirmation page using the router's path
    window.location.hash = 'checkout/confirmation/index.html';

    
  });
  cartSummaryContainer.appendChild(buyButton);

  const backButton = document.createElement('button');
  backButton.textContent = 'Back to homepage';
  backButton.onclick = () => window.location.hash = '';
  cartSummaryContainer.appendChild(backButton);


  return cartSummaryContainer;
}

export function displayCartItems() {
  const cart = getCart();
  const displayContainer = document.getElementById('products');
  displayContainer.innerHTML = ''; // Clear existing content
  
  cart.forEach(game => {
      const gameHtml = generateHtmlForGame(game);
      displayContainer.appendChild(gameHtml);
  });

  const cartInfo = displayCartInformation();
  displayContainer.appendChild(cartInfo);
}

export function renderCheckoutPage() {
    displayCartItems();

    const cartButton = document.getElementById('checkout');
    if (cartButton) {
        cartButton.classList.add('hidden');
    }

    const filtersContainer = document.querySelector('#genre-filters');
    if (filtersContainer) {
        filtersContainer.innerHTML = '';
    }
}