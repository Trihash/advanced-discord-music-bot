const Discord = require('discord.js')
const ytdl = require('ytdl-core')

function stop(message, serverQueue) {
    if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
    if (!serverQueue) return message.channel.send('There is no queue!');
	serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
    message.react('👋')
}

module.exports = stop