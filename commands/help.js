const { SlashCommandBuilder,EmbedBuilder } = require('discord.js');
const translate = require('./translate/help.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('help command'),
    async execute(interaction) {
        try {
            const embed = {
              "title": `Welcome to the help guide for using the Rofler bot!`,
              "description": `Here is a list of available commands and their descriptions:\n\nWe hope this information helps you in using the Rofler bot on the server. If you have any questions or issues, feel free to reach out to the server administration. Enjoy your game!`,
              "color": 0x179af1,
              "fields": [
                {
                  "name": `Game Commands`,
                  "value": translate.gameCommands[interaction.locale] ?? `\`/create\` - Use this command to create your user on the server. Upon creation, you will receive 150 starting coins.\n\n\`/balance\` - This command allows you to check your current coin balance.\n\n\`/top\` - (Under development) - Coming soon! This command will display a list of the top users on the server.\n\n\`/buy\` - Use this command to purchase buildings. You have two options:\n- subway - Purchase the \"Subnway\" building for 50 coins. It will generate 50 coins per hour.\n- doda - Purchase the \"Doda\" building for 100 coins. It will generate 100 coins per hour.\n\n\`/claim\` - Use this command to claim your income for the past hour. Make sure to use this command regularly to collect your coins!\n\n\`/update\` - Use this command to update your personal information. It also updates the hourly timer, starting from the moment you claimed your income with the /claim command.\n\n\`/delete\` - If you want to delete your user, use this command. Please note that deleting your user will also remove all your coins and buildings.`,
                  // "inline": true
                },
                {
                  "name": `General Command`,
                  "value": `\n\`/kostik\` - (Under development) - Coming soon! This command will allow users to move between two channels up to 20 times.\n\n\`/clear\` - With this command, you can clear the recent messages within the last 14 days. You can specify the number of messages you want to delete.\n\n\`/upom\` - This command mentions the user 10 times.\n\n\`/ping\` - Use this command to check the latency.\n\n\`/emoji\` - This command allows you to get a random emoji from the server.`,
                  // "inline": true
                }
              ],
              "image": {
                "url": `https://i.ibb.co/VVtQ0Sm/1644348915490.jpg`,
                "height": 0,
                "width": 0
              },
              "author": {
                "name": `Hello ${interaction.member.displayName}!`,
                "url": `https://discord.gg/3hBfxmfJz5`,
                "icon_url": `https://i.ibb.co/s9sBHkH/1girl-close-face-to-viewer-peace-sign-blue-hat-b-2062307604-e-IIb8-Cz3-Ioe-D-sd-counterfeit-2-5-drea.png`
              },
              "footer": {
                "text": `Rofler's help team`,
                "icon_url": `https://i.ibb.co/s9sBHkH/1girl-close-face-to-viewer-peace-sign-blue-hat-b-2062307604-e-IIb8-Cz3-Ioe-D-sd-counterfeit-2-5-drea.png`
              },
              timestamp: `2023-06-28T19:22:00.000Z`,
            }
            await interaction.reply({embeds: [embed], ephemeral: true});
        }
        catch (err) {
          console.error(err);
        }
    },
};