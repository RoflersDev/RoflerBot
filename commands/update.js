const { SlashCommandBuilder } = require('discord.js');

const coins = require('../scripts/mongodb/coins');

const timingsObj = {
	last: new Date().getTime(),
	ready: false
}
const buildings = {
	subnway: 0,
	doda: 0,
};
module.exports = {
	data: new SlashCommandBuilder()
		.setName('update')
		.setDescription('update'),
	async execute(interaction) {
		try {
			const memberId = interaction.member.id;
			const coinsData = await coins.findOne({ _id: memberId });
				await coins.findOneAndUpdate({
					_id: interaction.member.id,
				},
				{
					_id: interaction.member.id,
					username: interaction.member.displayName,
					timings: timingsObj,
					buildingsCount: buildings
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
};