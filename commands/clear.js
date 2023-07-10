const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('clear')
	.setDescription('clear msgs')
	.addIntegerOption(option => 
		option.setName('counts')
			.setDescription('counts msgs')
			.setRequired(true)
            .setMaxValue(25)
			)
            .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(interaction) {
		const counts = interaction.options.getInteger('counts');
        const fetchedMessages = await interaction.channel.messages.fetch({ limit: counts });
        console.log(fetchedMessages)
        try {
            await interaction.channel.bulkDelete(fetchedMessages)
            await interaction.reply(`deleted ${fetchedMessages.size} messages`); 
            setTimeout(() => interaction.deleteReply(), 5000);
        }
        catch (err) {
            console.error(err);
            await interaction.reply("Error");
        };
	},
};