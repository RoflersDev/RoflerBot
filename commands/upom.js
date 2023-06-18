const { SlashCommandBuilder} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('upom')
	.setDescription('mention user 10 times')
	.addUserOption(option => 
		option.setName('user')
			.setDescription('Имя пользователя')
			.setRequired(true)
			),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		const getUser = interaction.guild.members.cache.get(user.id)
		await interaction.reply(`alo ${getUser}`);
		for (let i = 0; i < 10; i++) {
			await interaction.followUp(`alo ${getUser}`);
		}

	},
};