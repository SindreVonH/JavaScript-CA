export const runConfirmationPage = () => {
    const productsContainer = document.getElementById('products');
    if (productsContainer) {
      // Clear existing content
      productsContainer.innerHTML = '';
  
      // Add the confirmation message
      const confirmationMessage = document.createElement('h1');
      confirmationMessage.textContent = 'Order is complete';
      productsContainer.appendChild(confirmationMessage);
  
      // Redirect to home after 5 seconds
      setTimeout(() => {
        window.location.hash = '#/checkout/index.html';
        localStorage.removeItem('cart'); // Clear the cart after confirmation
      }, 5000);
    } else {
      console.error('The products container was not found.');
    }
};