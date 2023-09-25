const fs = require('node:fs');
const path = require('node:path');
const {createClient} = require('@supabase/supabase-js');
require('dotenv').config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const token = process.env.TOKEN;

const { Client, Collection, Events, GatewayIntentBits, ActivityType } = require('discord.js');

const client = new Client({ intents: 
	[
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildMembers, 
		GatewayIntentBits.GuildMessages,
	]});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

const allowedUsers = ['490514959520759809', '1124618078978838648']; 

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
		try {
			const { data:coinsData, error } = await supabase
			.from('users')
			.select('*')
			.eq('id', interaction.member.id)
			.single();
		}
		catch (err) {
			console.log("Ошибка с ачивками: " + err.message);
		}
		const guildId = interaction.member.guild.id;
		const {data:achievList, err} = await supabase
			.from('achievements')
			.select('*')
		const channel = client.channels.cache.get(interaction.channel.id);

		const createEmmbed = (achievment) => {
			return {
				"title": achievment.name,
				"description": achievment.description,
				"color": 0xff7b00,
				"thumbnail": {
					"url": interaction.member.avatarURL({ format: 'png', dynamic: true, size: 2048 }) || interaction.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }),
					"height": 0,
					"width": 0
				  },
				timestamp: new Date().toISOString(),
			}
		}
		// if (allowedUsers.includes(interaction.user.id) && !coinsData[0].stats[guildId].achievements.test) {
		// 	coinsData[0].stats[guildId].achievements.test = true;
		// 	channel.send({content: "Achievement!", embeds: [createEmmbed(achievList[1])]});
		// }
		// if (coinsData.stats[guildId].coins > 1000 && !coinsData.stats[guildId].achievements.money) {
		// 	coinsData.stats[guildId].achievements.money = true;
		// 	channel.send({content: "Achievement!", embeds: [createEmmbed(achievList)]});
		// }
		// if (coinsData.stats[guildId].builds.subnway > 10 && !coinsData.stats[guildId].achievements.builds) {
		// 	coinsData.stats[guildId].achievements.builds = true;
		// 	const { data: updatedUserData, error: updateError } = await supabase
		// 		.from('users')
		// 		.update(coinsData)
		// 		.eq('id', interaction.member.id)
		// 	channel.send({content: "Achievement!", embeds: [createEmmbed(achievList[1])]});
		// }


	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
	
});

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);

	client.user.setPresence({ status: 'dnd' });
	client.user.setActivity('/help | vvl1m.github.io', { type: ActivityType.Listening });

});

client.login(token);
