const { SlashCommandBuilder } = require('discord.js');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete')
		.setDescription('just delete u'),
	async execute(interaction) {
		try {			
			const memberId = interaction.member.id;

			const guildId = interaction.member.guild.id;
			const userData = await coins.findOne({_id: memberId, servers: guildId});

			await coins.findOneAndDelete({
				_id: interaction.member.id,
				servers: guildId
			},
			{
				_id: interaction.member.id,
			},
			{
				upsert: true,
			})
			await interaction.reply(`done`);
		}
		catch (err) { 
			console.log(err.message);
		}
	},
};``