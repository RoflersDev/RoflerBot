const { EmbedBuilder, WebhookClient } = require('discord.js');
// const { webhookId, webhookToken } = require('./config.json');


const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/1123675030040100994/nnkT3X6keiJpI9vl5c-rjPI2OxGKRT-YiWvtd3kRwGUt8CWn0-JcTeFN8gVKCAS_pda_'});

const embed = new EmbedBuilder()
	.setTitle('Але, это Женька Пригожин')
    .setURL('https://youtu.be/dIbJuJbR5_E?t=20')
    .setAuthor({ name: 'Женька Пригожин', iconURL: 'https://icdn.lenta.ru/images/2023/06/27/00/20230627001839827/square_320_94d9dc2f991cdac4cb8266e9988dbd55.jpg', url: 'https://youtu.be/dIbJuJbR5_E?t=20' })
	.setColor(0x7289DA)
    .setThumbnail('https://republic.ru/images/photos/1180/2a77b4d8c5ed61e3c619042d5c3d48fa.jpeg');

webhookClient.send({
	embeds: [embed],
});