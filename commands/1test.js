const { SlashCommandBuilder,EmbedBuilder } = require('discord.js');

const mongoose = require('mongoose');

const coins = require('../scripts/mongodb/coins');
const buildsSchem = require('../scripts/mongodb/builds');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('test (dev)'),
	async execute(interaction) {
		try {
			// const embed = new EmbedBuilder()
			// 	.setTitle('чозахуйня')
    		// 	.setURL('https://youtu.be/dIbJuJbR5_E?t=20')
    		// 	.setAuthor({ name: 'Санчело', iconURL: 'https://icdn.lenta.ru/images/2023/06/27/00/20230627001839827/square_320_94d9dc2f991cdac4cb8266e9988dbd55.jpg', url: 'https://youtu.be/dIbJuJbR5_E?t=20' })
			// 	.setColor(0x7289DA)
			// await interaction.reply({embeds: [embed]});

			await interaction.reply("empty.")
		}
		catch (err) {

		}
	},
};