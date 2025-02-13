import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { randomCard } from "../../services/scryfallService.js";

export const data = new SlashCommandBuilder()
    .setName("randomcard")
    .setDescription("Gets a random card");

export async function execute(interaction, client) {
    await interaction.deferReply();

    const cardData = await randomCard();
    console.log(cardData);
    if (cardData.object === "error") {
        await interaction.editReply(`No card found`);
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