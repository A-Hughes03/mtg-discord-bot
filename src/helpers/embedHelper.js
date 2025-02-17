import { EmbedBuilder } from "discord.js";

export const createCardEmbed = (cardData, client) => {
    const legalFormats = Object.entries(cardData.legalities)
        .filter(([format, legality]) => legality === "legal")
        .map(([format]) => format)
        .join(", ") || "None";

    const cardEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(cardData.name)
        .setThumbnail(client.user.displayAvatarURL())
        .addFields(
            { name: "Scryfall Nonfoil Price:", value: cardData.prices.usd || "N/A" },
            { name: "Legal Formats:", value: legalFormats }
        )
        .setImage(cardData.image_uris.normal);

    return cardEmbed;
};