import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { searchCard } from "../../services/scryfallService.js";
import { createCardEmbed } from "../../helpers/embedHelper.js";

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

    if (cardData.object === "error") {
        await interaction.editReply(`No card found with the name ${cardName}`);
        return;
    }
    const legalFormats = Object.entries(cardData.legalities)
        .filter(([format, legality]) => legality === "legal")
        .map(([format]) => format)
        .join(", ");

    const cardEmbed = createCardEmbed(cardData, client);
    await interaction.editReply({ embeds: [cardEmbed] });
}