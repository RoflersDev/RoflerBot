const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
require('dotenv').config();
const {createClient} = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('top')
		.setDescription('top users'),
	async execute(interaction) {
        try {
        	const guildId = interaction.member.guild.id
        	let string = "";
        	let i = 1;
        	const users = [];
        	const { data: allUsers, error } = await supabase
        	  .from('users')
        	  .select(`*`)
			
			const serverUsers = allUsers.filter(element => element.stats[guildId]);
        	serverUsers.sort((a, b) => b.stats[guildId].coins - a.stats[guildId].coins);	
        	serverUsers.forEach(element => {
        	  console.log(element.stats);
        	  users.push({name: element.id, value: element.stats[guildId].coins});
        	});
        	users.forEach(user => {
        	  string += `${i}. <@${user.name}> with ${user.value} coins\n\n`;
        	  i++;
        	  console.log(`user id ${user.name}`);
        	});	
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
          } catch (error) {
            console.error('Error while iterating over elements:', error);
          }
	},
};``