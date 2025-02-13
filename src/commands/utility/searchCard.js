import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { searchCard } from "../../services/scryfallService.js";

export const data = new SlashCommandBuilder()
    .setName("searchcard")
    .setDescription("Searches for a card")
    .addStringOption((option) =>
        option
            .setName("cardname")
            .setDescription("The name of the card")
            .setRequired(true)
    );

export async function execute(interaction, client) {
    await interaction.deferReply();

    const cardName = interaction.options.getString("cardname");
    const cardData = await searchCard(cardName);

    console.log(cardData);
    if (cardData.object === "error") {
        await interaction.editReply(`No card found with the name ${cardName}`);
        return;
    }
    const legalFormats = Object.entries(cardData.legalities)
        .filter(([format, legality]) => legality === "legal")
        .map(([format]) => format)
        .join(", ");

    const cardEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(cardData.name)
        .setThumbnail(client.user.displayAvatarURL())
        .addFields(
            { name: "Scryfall Nonfoil Price:", value: cardData.prices.usd},
            { name: "Legal Formats:", value: legalFormats },
        )
        .setImage(cardData.image_uris.normal);

    await interaction.editReply({ embeds: [cardEmbed] });
}