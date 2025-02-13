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

    const cardEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(cardData.name)
        .setDescription(cardData.oracle_text)
        .setThumbnail(client.user.displayAvatarURL())
        .addFields(
            { name: "Mana Cost", value: cardData.mana_cost, inline: true },
            { name: "Type", value: cardData.type_line, inline: true }
        )
        .setImage(cardData.image_uris.normal);

    await interaction.editReply({ embeds: [cardEmbed] });
}