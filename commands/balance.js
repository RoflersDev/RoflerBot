const { SlashCommandBuilder } = require('discord.js');
const coins = require('../scripts/mongodb/coins');
const translate = require('./translate/balance.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('your balance'),
	async execute(interaction) {
		const memberId = interaction.member.id;
		const guildId = interaction.member.guild.id;
		try {
			const userData = await coins.findOne({_id: memberId, servers: guildId})
			if (userData) {
			const countsSub = userData.stats[guildId].builds.subnway;
			const countsDoda = userData.stats[guildId].builds.doda;
			const coinsU = ((countsSub * 50) + (countsDoda * 100));		
			let string = ``
			const waitingTime = Math.round((3600000 - (new Date().getTime() - userData.stats[guildId].timings.last)) / (1000 * 60));
	
			const embed = {
				"title": translate.title[interaction.locale] ?? `Your stats`,
				"description": `${userData.stats[guildId].coins} coins`,
				"color": 0xff7b00,
				"fields": [
					{
					  "name": `Buldings`,
					  "value": string = (waitingTime > 0) ? `- ${countsSub} subnways\n- ${countsDoda} dodas\n - You need wait ${Math.round((3600000 - (new Date().getTime() - userData.stats[guildId].timings.last)) / (1000 * 60))} minutes to recieve your ${coinsU} coins` : `- ${countsSub} subnways\n- ${countsDoda} dodas\n - You can recieve your ${coinsU} coins`
					}
				  ],
				"thumbnail": {
					"url": interaction.member.avatarURL({ format: 'png', dynamic: true, size: 1024 }) || interaction.user.avatarURL({ format: 'png', dynamic: true, size: 1024 }),
					"height": 0,
					"width": 0
				  },
				"author": {
				  "name": `Hello ${interaction.member.displayName}!`,
				  "url": `https://discord.gg/8Y2dkfFV`,
				  "icon_url": `https://i.ibb.co/s9sBHkH/1girl-close-face-to-viewer-peace-sign-blue-hat-b-2062307604-e-IIb8-Cz3-Ioe-D-sd-counterfeit-2-5-drea.png`
				},
				"footer": {
				  "text": `Rofler's help team`,
				  "icon_url": `https://i.ibb.co/s9sBHkH/1girl-close-face-to-viewer-peace-sign-blue-hat-b-2062307604-e-IIb8-Cz3-Ioe-D-sd-counterfeit-2-5-drea.png`
				},
				timestamp: new Date().toISOString(),
			}
			await interaction.reply({embeds: [embed], ephemeral: true});
		}
		else { 
			await interaction.reply(translate.error[interaction.locale] ?? "I think you don't have account. Try `/create` for create a new account");
		}
		}
		catch(err) {
			console.error(err);
		}
		
	}
};