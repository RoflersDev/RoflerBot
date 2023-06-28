const { SlashCommandBuilder } = require('discord.js');
const mongoose = require('mongoose');
const coins = require('../scripts/mongodb/coins');
const buildsSchem = require('../scripts/mongodb/builds');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('buy')
		.setDescription('buy builds')
		.addStringOption(option =>
			option.setName('build')
				.setDescription('build (dev)')
				.setRequired(true)
				.addChoices(
					{ name: 'subnway', value: 'subnway' },
					{ name: 'doda', value: 'doda' },
				)
			)
		.addIntegerOption(option =>
			option.setName('counts')
				.setDescription('counts (dev)')
				.setRequired(true)
			),
	async execute(interaction) {
		// mongoose.connect(process.env.MONGO_URI);
		try {
			const memberId = interaction.member.id;
			const build = interaction.options.getString('build');
            const counts = interaction.options.getInteger('counts');

			const coinsData = await coins.findOne({ _id: memberId});
			const dataBuilds = await buildsSchem.findOne({ build: build});


			console.log(`price ${dataBuilds.price} count ${coinsData.buildingsCount[build]}`)
			const sum = Math.round(dataBuilds.price * (Math.pow((1.2), coinsData.buildingsCount[build])));
			console.log(`sum ${sum}`);

			const buildings = {
				subnway: coinsData.buildingsCount.subnway,
				doda: coinsData.buildingsCount.doda,
			};
			if (coinsData.coinsCount < sum) {
				await interaction.reply(`u need ${sum - coinsData.coinsCount} more`);
			}
			else {
				buildings[build] += counts;
				coinsData.buildingsCount = buildings;
				
				coinsData.coinsCount -= sum;
				Math.round(coinsData.coinsCount)
				coinsData.save();
				await interaction.reply(`purchased ${counts} builds. now u have ${buildings.subnway} subnway's and ${buildings.doda} doda's. Spended ${sum}.\nBalance: ${coinsData.coinsCount}`);
			}
			console.log(dataBuilds.build);
            console.log(coinsData.coinsCount);
		}
		catch (err) { 
			console.log("Error: "+ err.message);
		}
	},
};