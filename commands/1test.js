const { SlashCommandBuilder,EmbedBuilder } = require('discord.js');

const mongoose = require('mongoose');

const coins = require('../scripts/mongodb/coins');
const buildsSchem = require('../scripts/mongodb/builds');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('test (dev)'),
	async execute(interaction) {
        // const memberId = interaction.member.id;
		// const guildId = interaction.member.guild.id;

		// const userData = await coins.findOne({_id: memberId, servers: guildId});
		// console.log(userData.stats);
		// const countsSub = userData.stats[guildId].builds.subnways;
		// const countsDoda = userData.stats[guildId].builds.doda;
		// const coinsU = ((countsSub * 50) + (countsDoda * 100));	

		//   await interaction.reply({embeds: [embed], ephemeral: true});
		// await interaction.reply(`imya 1 ${interaction.member.displayName} imya2 ${interaction.user.tag}`); 
		await interaction.reply(`empty.`); 
		// console.log(userData.stats[guildId].coins)
	},
};