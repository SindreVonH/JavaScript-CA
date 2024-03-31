import { gameData } from '../etc/doFetch.mjs';


let allGames = [];
 
async function initializeGamesDisplay() {
    if (!allGames.length) {
        allGames = await gameData();
    }
    listGames(allGames);
    createGenreFilters();
}

// cart button
const checkoutButton = document.getElementById('checkout');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            window.location.hash = '#/checkout/index.html';
        });
}
// Reactivate the hidden cart button, i hid the button then in cart
const cartButton = document.getElementById('checkout');
    if (cartButton) {
        cartButton.classList.remove('hidden');
    }

// Displays all or filtered games
const listGames = (games = []) => {
    let gamePlacement = document.getElementById("products");
    gamePlacement.innerHTML = ""; 
    games.forEach((game) => {
        createGameCard(game, gamePlacement);
    });
};

// Generating html for productIndex
const createGameCard = (game, gamePlacement) => {
    let imageDiv = document.createElement("div");
    imageDiv.className = "product-card";

    let imageElement = document.createElement("img");
    imageElement.className = "gameListImage";
    imageElement.src = game.image.url;
    imageElement.alt = game.image.alt;

    let linkTopProductPage = document.createElement("a");
    linkTopProductPage.className = "linkTopProductPage";
    linkTopProductPage.addEventListener("click", () => {
        localStorage.setItem("game", JSON.stringify(game));
        window.location.hash = "#/product/index.html";
    });

    let gameCardPrice = document.createElement("p");
    gameCardPrice.className = "gameCardPrice";
    gameCardPrice.textContent = game.onSale ? `Sale! Price: ${game.discountedPrice}` : `Price: ${game.price}`;

    let gameCardTitle = document.createElement("h2");
    gameCardTitle.className = "gameCardTitle";
    gameCardTitle.textContent = game.title;

    linkTopProductPage.appendChild(imageElement);
    imageDiv.appendChild(linkTopProductPage);
    imageDiv.appendChild(gameCardTitle);
    imageDiv.appendChild(gameCardPrice);

    gamePlacement.appendChild(imageDiv);
};

// Filtering function
async function filterCategory(genre) {
    let filteredGames = allGames;
    if (genre !== 'all') {
        filteredGames = allGames.filter(game => game.genre === genre);
    }
    listGames(filteredGames);
}

// Creates genre filters amd buttons
function createGenreFilters() {
    const genres = ['all', 'Adventure', 'Action', 'Sports', 'Horror'];
    const filterContainer = document.getElementById('genre-filters');
    filterContainer.innerHTML = ""; // Clear previous filters
    genres.forEach(genre => {
        const button = document.createElement('button');
        button.id = `filter-${genre}`;
        button.textContent = genre;
        button.addEventListener('click', () => filterCategory(genre));
        filterContainer.appendChild(button);
    });
}



export { listGames, allGames, initializeGamesDisplay };