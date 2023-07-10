const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kostik')
		.setDescription('Kostik command.')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('Имя пользователя')
                .setRequired(true)
                )
        .addIntegerOption(option =>             
            option.setName('counts')
                .setDescription('Количество рофланов')
                .setRequired(true)
                .setMaxValue(20)
                ),
	async execute(interaction) {
        let i = 0;
        const target = interaction.options.getUser('user');

        const getUserTarget = interaction.guild.members.cache.get(target.id);
        const voiceTarget = getUserTarget.voice.channelId
        if (voiceTarget === null) {
            interaction.reply(`Пользовать не в голосовом анале`);
            return;
        }
        const firstChannel = '948220604719464469';
        const secondChannel = '949662050970394644';
        if (voiceTarget === voiceTarget) {
            for (i; i < interaction.options.getInteger('counts'); i++) {
                getUserTarget.voice.setChannel(secondChannel);
                getUserTarget.voice.setChannel(firstChannel);
            }
        }
        getUserTarget.voice.setChannel(voiceTarget);
        interaction.reply(`Константин Федорович`);
	},
};