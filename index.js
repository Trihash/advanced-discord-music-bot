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
