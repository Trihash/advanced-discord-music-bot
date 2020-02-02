const Discord = require('discord.js')
const {
	prefix,
	token,
} = require('./config.json');
const config = require('./config.json');
const ytdl = require('ytdl-core');

const client = new Discord.Client();

const queue = new Map();

client.once('ready', () => {
	console.log('Logged in!');
	client.user.setActivity(`${prefix}play`)
});

client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});

const Discord = require('discord.js')
const colors = require("colors");

const {
	prefix,
	token,
} = require('./config.json');
const ytdl = require('ytdl-core');

const client = new Discord.Client();

const queue = new Map();

client.once('ready', () => {
	console.log('Ready!');
});

client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});


client.on('ready',() => {
	let memberCount = client.users.size;
	let serverCount = client.guilds.size;
	con(
	  `${"-".repeat(65)}\n`                         + 
	  "> Bienvenue sur les Logs.   \n" + 
	  `${"-".repeat(65)}\n`                         +  
	  "> Information du client : \n"                     +
	  `> Nom du client    : ${client.user.tag}!\n`          + 
	  `> ID du client     : ${client.user.id}\n`            +
	  `${"-".repeat(65)}\n`                         +
	  "> Stats client : \n"                              +
	  `> Utilisateurs : ${memberCount}\n`             +
	  `> Serveurs     : ${serverCount}\n`             +
	  `${"-".repeat(65)}\n`
	);
  });
  
  colors.setTheme({
	silly: 'rainbow',
	input: 'grey',
	verbose: 'cyan',
	prompt: 'grey',
	info: 'green',
	data: 'grey',
	help: 'cyan',
	warn: 'yellow',
	debug: 'blue',
	error: 'red',
  });
  
  client.on('ready', () => {
	console.log(colors.cyan('                         _         __          __ '))
	console.log(colors.cyan('   ____ ___  __  _______(_)____   / /_  ____  / /_'))
	console.log(colors.cyan('  / __ `__ \/ / / / ___/ / ___/  / __ \/ __ \/ __/'))
	console.log(colors.cyan(' / / / / / / /_/ (__  ) / /__   / /_/ / /_/ / /_  '))
	console.log(colors.cyan('/_/ /_/ /_/\__,_/____/_/\___/  /_.___/\____/\__/  '))

  });

client.on('message', async message => {
	if (message.author.bot) return;
	if (message.channel.type !== 'text') {
		message.channel.send('Wola t\'as cru qu\'on pouvait écouter de la musique en privée, fais toi un serveur privée!')
		return;
	}
	if (!message.content.startsWith(prefix)) return;
	const serverQueue = queue.get(message.guild.id);

	const cmds_index = require('./cmds/index.js')
	cmds_index(message, client, prefix, serverQueue, queue, config)	
});

client.login(token);
