const { SlashCommandBuilder } = require('discord.js');

const coins = require('../schema');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('buy')
		.setDescription('buy (dev)')
        .addIntegerOption(option => 
            option.setName('counts')
                .setDescription('Количество сабвеев')
                .setRequired(true)
                ),
	async execute(interaction) {
		try {
			const memberId = interaction.member.id;

            const counts = interaction.options.getInteger('counts');
            const price = 50;
            const sum = price * counts;

			const coinsData = await coins.findOne({ _id: memberId });
			if (coinsData.coinsCount < sum) {
				await interaction.reply(`u need ${Math.round(sum - coinsData.coinsCount)} more `);
			}
			else { 
				const getData = await coins.findOneAndUpdate({
					_id: memberId,
				},
				{
					$inc: {
                        buildingsCount: +counts,
                        coinsCount: -sum,
                    }
				},
				{
					new: true,
				})
                const newBalance = Math.round(getData.coinsCount);
				await interaction.reply(` purchased ${counts} builds. now u have ${getData.buildingsCount} buildings and ${newBalance} coins. `);
			}
		}
		catch (err) { 
			interaction.reply(err.message);
		}
	},
};``