const { SlashCommandBuilder } = require('discord.js');
const mongoose = require('mongoose');
const coins = require('../scripts/mongodb/coins');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('claim')
		.setDescription('claim money'),
	async execute(interaction) {
		try {
			
			const memberId = interaction.member.id;
			const guildId = interaction.member.guild.id;
			const coinsData = await coins.findOne({ _id: memberId});
			const current = coinsData.stats[guildId].timings.last;
			console.log(JSON.stringify(coinsData));
			
			const countsSub = await coinsData.stats[guildId].builds.subnway;
			const countsDoda = await coinsData.stats[guildId].builds.doda;

			console.log(`${countsDoda} and ${countsSub}`)
			const coinsU = ((countsSub * 50) + (countsDoda * 100));

			const currentTime = new Date().getTime();

			const data = {
				coins: coinsData.stats[guildId].coins + coinsU,
				builds: {
					subnway: countsSub,
					doda: countsDoda,
				},
				timings: {
					last: interaction.createdTimestamp,
					ready: false
				}
			}
			if (currentTime - coinsData.stats[guildId].timings.last >= 60 * 60 * 1000 || coinsData.stats[guildId].timings.ready === true) {
				await coins.findOneAndUpdate({
					_id: memberId,
				},
				{
					$set: {
						[`stats.${guildId}`]: data
					}
				},
				{
					upsert: true,
				})			    
			    await interaction.reply(`u recived ${coinsU} coins. now u have ${coinsData.stats[guildId].coins + coinsU} coins`)
			} else {
			    await interaction.reply(`u need wait ${Math.round((3600000 - (currentTime - coinsData.stats[guildId].timings.last)) / (1000 * 60))} minutes`)
			}
		}
		catch (err) {
			console.log(err);
		}
	},
};