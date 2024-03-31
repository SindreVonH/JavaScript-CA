import { addToCart } from '../etc/addToCart.mjs';

export const displayGameDetail = () => {
    const gameDataJSON = localStorage.getItem('game');
    const game = JSON.parse(gameDataJSON);

    if (!game) {
        console.error('No game data found in localStorage.');
        return;
    }
    
    // Removeing the filters so the dont show then on productpage
    const filtersContainer = document.querySelector('#genre-filters');
    if (filtersContainer) {
        filtersContainer.innerHTML='';
    }
    // Reactivate the hidden cart button, i hid the button then in cart
    const cartButton = document.getElementById('checkout');
    if (cartButton) {
        cartButton.classList.remove('hidden');
    }

    //Clear existing content within #products
    const contentArea = document.querySelector('#products');
    contentArea.innerHTML = '';  

    const checkoutButton = document.getElementById('checkout');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            window.location.hash = '#/checkout/index.html';
        });
    }

    
    insertGameDetail(game, contentArea);
};

// Generating html for productPage
const insertGameDetail = (game, contentArea) => {
    const detailContainer = document.createElement('div');
    detailContainer.className = 'game-detail';

    const img = document.createElement('img');
    img.src = game.image.url;
    img.alt = game.image.alt || "Game image";
    detailContainer.appendChild(img);

    const title = document.createElement('h2');
    title.textContent = game.title;
    detailContainer.appendChild(title);

    const genre = document.createElement('p');
    genre.textContent = `Genre: ${game.genre}`;
    detailContainer.appendChild(genre);

    const released = document.createElement('p');
    released.textContent = `Released: ${game.released}`;
    detailContainer.appendChild(released);

    const price = document.createElement('p');
    price.textContent = game.onSale ? `Sale! Price: ${game.discountedPrice}` : `Price: ${game.price}`
    detailContainer.appendChild(price);

    const description = document.createElement('p');
    description.textContent = game.description;
    detailContainer.appendChild(description);

    const addToCartButton = document.createElement('button');
    addToCartButton.innerText = "Add To Cart";
    addToCartButton.addEventListener("click", () => {
        addToCart(game);
    });
    detailContainer.appendChild(addToCartButton);

    const backButton = document.createElement('button');
    backButton.textContent = 'Back to homepage';
    backButton.onclick = () => window.location.hash = '';
    detailContainer.appendChild(backButton);

    contentArea.appendChild(detailContainer);
};

