const { SlashCommandBuilder } = require('discord.js');
const coins = require('../scripts/mongodb/coins');
const update = require('../update');

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

			const countsSub = await coinsData.stats[guildId].builds.subnway;
			const countsDoda = await coinsData.stats[guildId].builds.doda;
			console.log(`${countsDoda} and ${countsSub}`)
			const coinsU = ((countsSub * 50) + (countsDoda * 100));

			const currentTime = new Date().getTime();
			
			if (currentTime - coinsData.stats[guildId].timings.last >= 60 * 60 * 1000 || coinsData.stats[guildId].timings.ready === true) {
				coinsData.stats[guildId].coins += coinsU;
				coinsData.stats[guildId].timings.last = currentTime;
				coinsData.stats[guildId].timings.ready = false;
				coinsData.markModified(`stats`);
				coinsData.save()
				.then(() => {
					console.log(`saved coins`);
				})
				.catch((err) => {
					console.log(err);
				});
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