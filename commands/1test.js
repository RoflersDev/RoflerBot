const { SlashCommandBuilder,EmbedBuilder } = require('discord.js');

const mongoose = require('mongoose');

const coins = require('../scripts/mongodb/coins');
const buildsSchem = require('../scripts/mongodb/builds');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('test (dev cmd)'),
	async execute(interaction) {
        // const memberId = interaction.member.id;
		// const guildId = interaction.member.guild.id;

		// const userData = await coins.findOne({_id: memberId, servers: guildId});
		// console.log(userData.stats);
		// const countsSub = userData.stats[guildId].builds.subnways;
		// const countsDoda = userData.stats[guildId].builds.doda;
		// const coinsU = ((countsSub * 50) + (countsDoda * 100));		

		// let string = ``
		// const waitingTime = Math.round((3600000 - (new Date().getTime() - userData.stats[guildId].timings.last)) / (1000 * 60));

		// const embed = {
        //     "title":  `Your stats`,
		// 	"description": `${userData.stats[guildId].coins} coins`,
        //     "color": 0xff7b00,
        //     "components": [
		// 		{
		// 		  "type": 1,
		// 		  "components": [
		// 			{
		// 			  "style": 3,
		// 			  "label": `Buy this`,
		// 			  "custom_id": `row_0_button_0`,
		// 			  "disabled": false,
		// 			  "type": 2
		// 			}
		// 		  ]
		// 		}
		// 	  ],
		// 	  "embeds": [
		// 		{
		// 		  "type": "rich",
		// 		  "title": `Buying menu`,
		// 		  "description": `Here u can buy any build or smth more`,
		// 		  "color": 0x00FFFF,
		// 		  "fields": [
		// 			{
		// 			  "name": `Subnway`,
		// 			  "value": `Cost: 1250`
		// 			},
		// 			{
		// 			  "name": `Doda`,
		// 			  "value": `Cost: 256`
		// 			}
		// 		  ]}
		// 		]
		// }
		//   await interaction.reply({embeds: [embed], ephemeral: true});
		// await interaction.reply(`imya 1 ${interaction.member.displayName} imya2 ${interaction.user.tag}`); 
		await interaction.reply(`empty.`); 
		// console.log(userData.stats[guildId].coins)
	},
};