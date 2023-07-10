const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const coins = require('../scripts/mongodb/coins');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('top')
		.setDescription('top users'),
	async execute(interaction) {
        try {
          const guildId = interaction.member.guild.id;
          const allUsers = await coins.find({servers: guildId}).sort({[`stats.${guildId}.coins`]: -1}).lean();
          console.log(allUsers)
          let i = 1;
          const users = [];
          allUsers.forEach(user => { 
            users.push({name: user._id, value: user.stats[guildId].coins});
          });

          let string = "";
          users.forEach(user => {
            string += `${i}. <@${user.name}> with ${user.value} coins\n\n`;
            i++;
            console.log(`user id ${user.name}`);
          });
          // console.log(interaction.member.id);
          const embed = {
            "title": `Top users`,
            "description": string,
            "color": 0x179af1,
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
            await interaction.reply({embeds: [embed]});
            // await interaction.reply("sosi");
          } catch (error) {
            console.error('Error while iterating over elements:', error);
          }
	},
};``