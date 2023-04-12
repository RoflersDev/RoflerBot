const { SlashCommandBuilder } = require('discord.js');
const { createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const { joinVoiceChannel } = require('@discordjs/voice');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('audio')
		.setDescription('audio.'),
	async execute(interaction) {
        try {
			const connection = joinVoiceChannel({
				channelId: interaction.member.voice.channel.id,
				guildId: "943541426766094397",
				adapterCreator: interaction.guild.voiceAdapterCreator
			});
			const player = createAudioPlayer();
			const resource = createAudioResource('./audio/audio.mp3');
			player.play(resource);
			connection.subscribe(player);
			await interaction.reply(`Test.`);
		} catch (err) {
			await interaction.reply("Это используется только в голосовом анале");
		}
	},
};