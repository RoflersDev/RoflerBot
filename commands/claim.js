const { SlashCommandBuilder } = require('discord.js');
const update = require('../update');
require('dotenv').config();
const {createClient} = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
module.exports = {
	data: new SlashCommandBuilder()
		.setName('claim')
		.setDescription('claim money'),
	async execute(interaction) {
		try {
			
			const memberId = interaction.member.id;
			const guildId = interaction.member.guild.id;
			const {data:coinsData, error} = await supabase
				.from('users')
				.select('*')
				.eq('id', memberId)
				.single();
				console.log(coinsData.stats[guildId])

			const current = coinsData.stats[guildId].timings.last;

			const countsSub = await coinsData.stats[guildId].builds.subnway;
			const countsDoda = await coinsData.stats[guildId].builds.doda;
			console.log(`${countsDoda} and ${countsSub}`)
			const coinsU = ((countsSub * 50) + (countsDoda * 100));

			const currentTime = new Date().getTime();
			
			if (true == true) {
				coinsData.stats[guildId].coins += coinsU;
				coinsData.stats[guildId].timings.last = currentTime;
				coinsData.stats[guildId].timings.ready = false;
				const { data: updatedUserData, error: updateError } = await supabase
					.from('users')
					.update(coinsData)
					.eq('id', memberId)
				console.log(coinsData.stats[guildId])
			    await interaction.reply(`u recived ${coinsU} coins. now u have ${coinsData.stats[guildId].coins} coins`)
			} else {
			    await interaction.reply(`u need wait ${Math.round((3600000 - (currentTime - coinsData.stats[guildId].timings.last)) / (1000 * 60))} minutes`)
			}
		}
		catch (err) {
			console.log(err);
		}
	},
};