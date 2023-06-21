const { SlashCommandBuilder } = require('discord.js');

const coins = require('../schema');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('balance (dev)'),
	async execute(interaction) {
        const memberId = interaction.member.id;
	    const coinsData = await coins.findOne({ _id: memberId });
        console.log(coinsData.coinsCount);

        await interaction.reply(`Hello ${coinsData.username}! You have ${Math.round(coinsData.coinsCount)} coins and ${coinsData.buildingsCount} builds.`);

	},
};``