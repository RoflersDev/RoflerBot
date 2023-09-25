const { SlashCommandBuilder } = require('discord.js');
require('dotenv').config();
const {createClient} = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const servers = [];
const userDataObj = {}
const achievements = {
	test: false,
	money: false,
	builds: false
}
module.exports = {
	data: new SlashCommandBuilder()
		.setName('create')
		.setDescription('create a new acc'),
	async execute(interaction) {
		const newData = {
			coins: 150,
			builds: {
			  subnway: 0,
			  doda: 0,
			},
			timings: {
			  last: interaction.createdTimestamp,
			  ready: false,
			},
			achievements: achievements,
			name: interaction.member.guild.name
		  };
		try {
			const memberId = interaction.member.id;
			const guildId = interaction.member.guild.id;
			
			const { data, error } = await supabase
				.from('users')
				.select('*')
				.eq('id', memberId)
				.single();
			if (!data) {
				servers.push(guildId);
				userDataObj[guildId] = newData;
				const { data: upsertData, error: upsertError } = await supabase
					.from('users')
					.upsert({ 
						id: memberId, 
						username: interaction.user.username, 
						servers: servers, 
						stats: userDataObj,
						avatar: interaction.user.avatarURL({ format: 'png', dynamic: true, size: 2048 })

					})
				if (upsertError) {
				  console.error('Ошибка при выполнении upsert:', upsertError)
				} else {
				  console.log('Upsert выполнен успешно')
				}
				await interaction.reply('created account');
			} else if (!data.stats[guildId]) { // не существует статы для сервера 
				
				servers.push(guildId);
				userDataObj[guildId] = newData;
				const { data, error } = await supabase
					.from('users')
					.upsert({ 
						id: memberId, 
						username: interaction.user.username, 
						servers: servers, 
						stats: userDataObj,
						avatar: interaction.user.avatarURL({ format: 'png', dynamic: true, size: 2048 })
					})
				if (error) {
					console.error('Ошибка при выполнении запроса:', error);
				  } else {
					console.log('Результат запроса:', data);
				  }
				await interaction.reply('created account for new server');
			} 
			else if (data.stats[guildId]){ // существеует стата для сервера
				await interaction.reply('u already created account');
			}

		}
		catch (err) { 
			console.log(err.message);
		}
	}
}