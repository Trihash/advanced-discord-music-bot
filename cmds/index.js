const Discord = require('discord.js')

function cmds_index(message, client, prefix, serverQueue, queue){

    const play = require('./play.js')

    if (message.content.startsWith(`${prefix}play`)) {
        const execute = require('./execute.js')
		execute(message, play, serverQueue, queue);
	} else if (message.content.startsWith(`${prefix}skip`)) {
        const skip = require('./skip.js')
		skip(message, serverQueue);
	} else if (message.content.startsWith(`${prefix}stop`)) {
        const stop = require('./stop.js')
		stop(message, serverQueue);
	} else {
		message.reply('✖')
	}
}

module.exports = cmds_index