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
				.setMinValue(1)
				.setMaxValue(50)
			),
	async execute(interaction) {
		const memberId = interaction.member.id;
		const guildId = interaction.member.guild.id;
		try {
			const build = interaction.options.getString('build');
            const counts = interaction.options.getInteger('counts');
			const userData = await coins.findOne({_id: memberId});
			const dataBuilds = await buildsSchem.findOne({ build: build});
			const builds = {
				subnway: await userData.stats[guildId].builds.subnway,
				doda: await userData.stats[guildId].builds.doda,
			}
			console.log(`price ${dataBuilds.price} count ${builds[build]}`)
			// const sum = Math.round((dataBuilds.price * (Math.pow(userData.stats[guildId].builds[build], (1.2)))));
			const sum = Math.round(dataBuilds.price + ((builds[build] + counts) - 1) * dataBuilds.price)
			console.log(`sum ${sum}`);

			if (userData.stats[guildId].coins < sum) {
				await interaction.reply(`u need ${sum - userData.stats[guildId].coins} more`);
			}
			else {
				builds[build] += counts;

				coins.findOneAndUpdate({
					_id: memberId,
				},
				{
					$set: {
						[`stats.${guildId}.coins`]: userData.stats[guildId].coins - sum,
						[`stats.${guildId}.builds`]: builds,
					}
				},
				{
					upsert: true,
				})
				.then(() => {
					console.log(userData.stats[guildId])
					interaction.reply(`purchased ${counts} builds. now u have ${builds.subnway} subnway's and ${builds.doda} doda's. Spended ${sum}.\nBalance: ${userData.stats[guildId].coins - sum}`);
				})
			}
		}
		catch (err) { 
			console.log("Error: "+ err.message);
		}
	},
};