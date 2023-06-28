const { SlashCommandBuilder } = require('discord.js');

const mongoose = require('mongoose');

const coins = require('../scripts/mongodb/coins');
const buildsSchem = require('../scripts/mongodb/builds');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('claim')
		.setDescription('claim money'),
	async execute(interaction) {
		try {
			const memberId = interaction.member.id;
			const coinsData = await coins.findOne({ _id: memberId});
			// subnway 50 in hour 
			const countsSub = coinsData.buildingsCount.subnway;
			// doda 100 in hour 
			const countsDoda = coinsData.buildingsCount.doda;

			console.log(`${countsDoda} and ${countsSub}`)
			const coinsU = ((countsSub * 50) + (countsDoda * 100));
			console.log(coinsU);

			const currentTime = new Date().getTime();
			console.log(currentTime);
			const timingsObj = {
				last: interaction.createdTimestamp,
				ready: false
			}

			if (currentTime - coinsData.timings.last >= 60 * 60 * 1000 || coinsData.timings.ready === true) {
			    coinsData.timings = timingsObj;
				coinsData.coinsCount += coinsU;

				Math.round(coinsData.coinsCount);
			    coinsData.save();
			    await interaction.reply(`u recived ${coinsU} coins. now u have ${coinsData.coinsCount} coins`)
			} else {
			    await interaction.reply(`u need wait ${Math.round((3600000 - (currentTime - coinsData.timings.last)) / (1000 * 60))} minutes`)
			}
		}
		catch (err) {
			console.log(err);
		}
	},
};