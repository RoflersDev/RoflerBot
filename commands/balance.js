const { SlashCommandBuilder } = require('discord.js');

const coins = require('../scripts/mongodb/coins');
const buildsSchem = require('../scripts/mongodb/builds');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('balance (dev)'),
	async execute(interaction) {
        const memberId = interaction.member.id;
	    const coinsData = await coins.findOne({ _id: memberId });
		// const dataBuilds = await buildsSchem.findOne();

        console.log(coinsData.coinsCount);

        await interaction.reply(`Hello ${coinsData.username}! You have ${Math.round(coinsData.coinsCount)} coins.`);

	},
};``