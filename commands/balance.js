const { SlashCommandBuilder } = require('discord.js');
require('dotenv').config();
const {createClient} = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const translate = require('./translate/balance.json');

const achievSt = null;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('your balance'),
	async execute(interaction) {
		const memberId = interaction.member.id;
		const guildId = interaction.member.guild.id;
		try {
			// const userData = await coins.findOne({_id: memberId, servers: guildId})


			const { data, error } = await supabase
				.from('users')
				.select('*')
				.eq('id', memberId)
				.single()
			console.log(data)
			const achievementsUser = data.stats[guildId].achievements
			const {data:achievementsList, err} = await supabase
				.from('achievements')
				.select('*')
			
			let achievSt = ""

			achievementsList.forEach(element => {
				if (achievementsUser[element.tag] == true) {
					achievSt += element.name + " - " + element.description + "\n"
				}
			});
			
			console.log(achievementsUser)
			if (data !== "") {
				const countsSub = data.stats[guildId].builds.subnway;
				const countsDoda = data.stats[guildId].builds.doda;
				const coinsU = ((countsSub * 50) + (countsDoda * 100));
				let string = ``
				const waitingTime = Math.round((3600000 - (new Date().getTime() - data.stats[guildId].timings.last)) / (1000 * 60));
				
				const embed = {
					"title": translate.title[interaction.locale] ?? `Your stats`,
					"description": `${data.stats[guildId].coins} coins`,
					"color": 0xff7b00,
					"fields": [
						{
						  "name": `Buldings`,
						  "value": string = (waitingTime > 0) ? `- ${countsSub} subnways\n- ${countsDoda} dodas\n - You need wait ${Math.round((3600000 - (new Date().getTime() - data.stats[guildId].timings.last)) / (1000 * 60))} minutes to recieve your ${coinsU} coins` : `- ${countsSub} subnways\n- ${countsDoda} dodas\n - You can recieve your ${coinsU} coins`
						},
						{
							"name": `Achievements`,
							"value": achievSt || "You dont have any" 
						}
					  ],
					"thumbnail": {
						"url": interaction.member.avatarURL({ format: 'png', dynamic: true, size: 2048 }) || interaction.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }),
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