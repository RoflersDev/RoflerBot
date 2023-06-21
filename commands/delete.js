const { SlashCommandBuilder } = require('discord.js');

const coins = require('../schema');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete')
		.setDescription('just delete u'),
	async execute(interaction) {
		try {
				await coins.findOneAndDelete({
					_id: interaction.member.id,
				},
				{
					_id: interaction.member.id,
					username: interaction.member.displayName,
				},
				{
					upsert: true,
				})
				await interaction.reply(`done`);
		}
		catch (err) { 
			interaction.reply(err.message);
		}
	},
};``