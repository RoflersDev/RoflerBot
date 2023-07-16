const { SlashCommandBuilder } = require('discord.js');
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
			const sum = Math.round(dataBuilds.price + ((builds[build] + counts) - 1) * dataBuilds.price)
			console.log(`sum ${sum}`);

			if (userData.stats[guildId].coins < sum) {
				await interaction.reply(`u need ${sum - userData.stats[guildId].coins} more`);
			}
			else {
				userData.stats[guildId].coins -= sum;
				userData.stats[guildId].builds[build] += counts;
				userData.markModified(`stats`);
				userData.save();
				console.log(userData.stats[guildId])
				await interaction.reply(`purchased ${counts} ${build}'s. now u have ${userData.stats[guildId].builds.subnway} subnway's and ${userData.stats[guildId].builds.doda} doda's. Spended ${sum}.\nBalance: ${userData.stats[guildId].coins}`);
			}
		}
		catch (err) { 
			console.log("Error: "+ err.message);
		}
	},
};