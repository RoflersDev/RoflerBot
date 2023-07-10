const { SlashCommandBuilder } = require('discord.js');
const coins = require('../scripts/mongodb/coins');
const servers = [];
const userDataObj = {}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create')
		.setDescription('create a new acc'),
	async execute(interaction) {
		try {
			const memberId = interaction.member.id;

			const guildId = interaction.member.guild.id;
			const userData = await coins.findOne({_id: memberId, servers: guildId});
			console.log(userData)
			if (userData) {
				await interaction.reply(`u already created account`);
			}
			else { 
				servers.push(guildId);
				const data = {
					coins: 150,
					builds: {
						subnway: 1,
						doda: 1,
					},
					timings: {
						last: interaction.createdTimestamp,
						ready: false
					}
				}
				userDataObj[guildId] = data;
				await coins.findOneAndUpdate({
					_id: memberId,
				},
				{
					_id: memberId,
					username: interaction.user.tag,
					servers: servers,
					stats: userDataObj,
				},
				{
					upsert: true,
				})
				await interaction.reply(`done`);
			}
		}
		catch (err) { 
			console.log(err.message);
		}
	},
};``