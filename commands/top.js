const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const coins = require('../scripts/mongodb/coins');

function sortObjectsByNameCount(objects) {
  objects.sort((a, b) => b.value - a.value);
  return objects;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('top')
		.setDescription('top (dev)'),
	async execute(interaction) {
        try {
          const allUsers = await coins.find({}).sort({coinsCount: -1}).lean();
          const users = [];
          allUsers.forEach(user => { 
            users.push({name: user.username, value: user.coinsCount.toString()});
          });

          const embed = {
            "title": `Top users`,
            "description": `Here is a top users list`,
            "color": 0x179af1,
            "fields": users,

            "author": {
              "name": `Rofler's help team!`,
              "url": `https://discord.gg/8Y2dkfFV`,
              "icon_url": `https://i.ibb.co/s9sBHkH/1girl-close-face-to-viewer-peace-sign-blue-hat-b-2062307604-e-IIb8-Cz3-Ioe-D-sd-counterfeit-2-5-drea.png`
            },
            "footer": {
              "text": `Rofler's help team!`,
              "icon_url": `https://i.ibb.co/s9sBHkH/1girl-close-face-to-viewer-peace-sign-blue-hat-b-2062307604-e-IIb8-Cz3-Ioe-D-sd-counterfeit-2-5-drea.png`
            },
            timestamp: `2023-06-28T19:22:00.000Z`,
          }
            await interaction.reply({embeds: [embed]});
          } catch (error) {
            console.error('Error while iterating over elements:', error);
          }
	},
};``