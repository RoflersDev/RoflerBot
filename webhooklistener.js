const { EmbedBuilder, WebhookClient } = require('discord.js');
// const { webhookId, webhookToken } = require('./config.json');


const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhook'});

const embed = new EmbedBuilder()
	.setTitle('Але, это Жень')
    .setURL('https://youtu.be/dIbJbR5_E?t=20')
    .setAuthor({ name: 'Женьигожин', iconURL: 'https://icdn.lenta.ru/images/2023/06/27/00/20230627827/square_320_94d9dc2f991cdac4cb8266e9988dbd55.jpg', url: 'https://youtu.be/dIbJuJb_E?t=20' })
	.setColor(0x7289DA)
    .setThumbnail('https://republic.ru/images/photos/1180/2a77b4d8c5ed61e3c619042d5c3d48fa.jpeg');

webhookClient.send({
	embeds: [embed],
});