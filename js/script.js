import { router } from './etc/router.mjs';
import { API_GAMES_URL, gameData } from "./etc/doFetch.mjs";


const start = async () => {
    await gameData(API_GAMES_URL);
    router();
};

start();

