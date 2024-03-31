const noroffAPI = "https://v2.api.noroff.dev";

export const API_GAMES_URL = `${noroffAPI}/gamehub`;

export async function gameData() {
    try {
        const response = await fetch(API_GAMES_URL);
        const data = await response.json();
    
        return data.data; 
    } catch (error) {
        console.error("Failed to fetch game data:", error);
        throw error; 
    }
}

gameData();


