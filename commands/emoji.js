const { SlashCommandBuilder, Emoji } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('emoji')
		.setDescription('random emoji'),
	async execute(interaction) {
        const emojiList = interaction.guild.emojis.cache.map(emoji => emoji.toString());
        const emojiId = Math.floor(Math.random() * emojiList.length);
        interaction.reply(`${emojiList[emojiId]}`);
		
		console.log(emojiId);
	},
};