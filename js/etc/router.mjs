import { initializeGamesDisplay } from '../pages/productIndex.mjs';
import { displayGameDetail } from '../pages/productPage.mjs';
import { renderCheckoutPage } from '../pages/checkoutPage.mjs'
import { runConfirmationPage } from '../pages/confirmationPage.mjs';

export async function router() {
  const url = new URL(window.location.href);
  const hash = url.hash.slice(1);

  

    const routes = [
      { path: /^#?$/, controller: initializeGamesDisplay },
      { path: /product\/index\.html$/, controller: displayGameDetail },
      { path: /checkout\/index\.html$/, controller: renderCheckoutPage },
      { path: /checkout\/confirmation\/index\.html$/, controller: runConfirmationPage },
    ];

    const route = routes.find((route) => route.path.test(hash));
    

    if(route) {
        await route.controller();
    } else {
        console.log("No matching route found");
    }
}

window.addEventListener('hashchange', router);
