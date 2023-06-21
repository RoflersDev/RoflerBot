const { SlashCommandBuilder, userMention } = require('discord.js');

const coins = require('../schema');

function sortObjectsByNameCount(objects) {
  objects.sort((a, b) => b.coins - a.coins);
  return objects;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('top')
		.setDescription('top (dev)'),
	async execute(interaction) {
        try {
            const allUsers = await coins.find({}).lean();
            const users = [];
            let topInc = 0;
            const updatePromises = allUsers.map((user) => {
                users.push({name: user.username, id:user._id, coins:user.coinsCount});    
                topInc++;
            });
            sortObjectsByNameCount(users);

            await interaction.reply(`user ${users[0].name} with ${Math.round(users[0].coins)} coins `);
          } catch (error) {
            console.error('Error while iterating over elements:', error);
          }
	},
};``