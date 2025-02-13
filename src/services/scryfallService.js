export const searchCard = async (cardName) => {
    const response = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${cardName}`);
    const data = await response.json();
    return data;
}

export const randomCard = async () => {
    const response = await fetch(`https://api.scryfall.com/cards/random`);
    const data = await response.json();
    return data;
}