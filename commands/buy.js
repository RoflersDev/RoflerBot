const { SlashCommandBuilder } = require('discord.js');
require('dotenv').config();
const {createClient} = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

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
			const {data:userData, error} = await supabase
				.from('users')
				.select('*')
				.eq('id', memberId)
				.single();
			console.log(userData)
			const {data: dataBuilds, error: errorBuilds} = await supabase.from('builds').select('*').eq('name', build).single();
			console.log(dataBuilds.price)
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

				const { data: updatedUserData, error: updateError } = await supabase
					.from('users')
					.update(userData)
					.eq('id', memberId)
				console.log(userData.stats[guildId])
				await interaction.reply(`purchased ${counts} ${build}'s. now u have ${userData.stats[guildId].builds.subnway} subnway's and ${userData.stats[guildId].builds.doda} doda's. Spended ${sum}.\nBalance: ${userData.stats[guildId].coins}`);
			}
		}
		catch (err) { 
			console.log("Error: "+ err.message);
		}
	},
};