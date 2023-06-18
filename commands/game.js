const { SlashCommandBuilder } = require('discord.js');

const coins = require('../schema');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('create')
		.setDescription('create a new acc'),
	async execute(interaction) {
		try {
			const memberId = interaction.member.id;
			const coinsData = await coins.findOne({ _id: memberId });
			if (coinsData) {
				await interaction.reply(`sosi`);
			}
			else { 
				await coins.findOneAndUpdate({
					_id: interaction.member.id,
				},
				{
					_id: interaction.member.id,
					username: interaction.member.nickname,
				},
				{
					upsert: true,
				})
				await interaction.reply(`done`);
			}
		}
		catch (err) { 
			interaction.reply(err.message);
		}
	},
};``