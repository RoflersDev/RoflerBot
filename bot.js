const fs = require('node:fs');
const path = require('node:path');
const mongoose = require('mongoose');
require('dotenv').config();
const token = process.env.TOKEN;
const coins = require('./scripts/mongodb/coins');
const achievementsData = require('./scripts/mongodb/achievements');
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
		
		const coinsData = await coins.findOne({ _id: interaction.member.id});
		const guildId = interaction.member.guild.id;
		const achievList = await achievementsData.find();
		const channel = client.channels.cache.get(interaction.channel.id);

		if (!coinsData.stats[guildId].achievements || !coinsData.username) {
			coinsData.stats[guildId].achievements = 
			{
				test: false,
				money: false,
				builds: false
			}
			coinsData.username = interaction.user.tag;
		}
		const createEmmbed = (achievment) => {
			return {
				"title": achievment.name[interaction.locale],
				"description": achievment.description[interaction.locale],
				"color": 0xff7b00,
				"thumbnail": {
					"url": interaction.member.avatarURL({ format: 'png', dynamic: true, size: 1024 }) || interaction.user.avatarURL({ format: 'png', dynamic: true, size: 1024 }),
					"height": 0,
					"width": 0
				  },
				timestamp: new Date().toISOString(),
			}
		}
		if (allowedUsers.includes(interaction.user.id) && !coinsData.stats[guildId].achievements.test) {
			coinsData.stats[guildId].achievements.test = true;
			channel.send({content: "Achievement!", embeds: [createEmmbed(achievList[0])]});
		}
		if (coinsData.stats[guildId].coins > 1000 && !coinsData.stats[guildId].achievements.money) {
			coinsData.stats[guildId].achievements.money = true;
			channel.send({content: "Achievement!", embeds: [createEmmbed(achievList[1])]});
		}
		if (coinsData.stats[guildId].builds.subnway > 10 && !coinsData.stats[guildId].achievements.builds) {
			coinsData.stats[guildId].achievements.builds = true;
			channel.send({content: "Achievement!", embeds: [createEmmbed(achievList[2])]});
		}
		coinsData.markModified(`stats`);
		await coinsData.save()
		.then(() => {
			console.log(`saved achievment`);
		})
		.catch((err) => {
			console.log(err);
		});
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
	
});

const close = () => { 
	mongoose.disconnect()
	.then(() => {
	  console.log('Соединение закрыто успешно');
	})
	.catch((err) => {
	  console.error('Ошибка при разрыве соединения:', err);
	});
}
const open = () => {
	mongoose.connect(process.env.MONGO_URI)
	.then(() => {
	  console.log('Подключено');
	})
	.catch((err) => {
	  console.error('Ошибка при подключении соединения:', err);
	});
}

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);

	client.user.setPresence({ status: 'dnd' });
	client.user.setActivity('/help | vvl1m.github.io', { type: ActivityType.Listening });

	close();
	open();
});

client.login(token);
