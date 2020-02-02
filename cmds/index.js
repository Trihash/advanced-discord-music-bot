const Discord = require('discord.js')

function cmds_index(message, client, prefix, serverQueue, queue, config){

    const play = require('./play.js')

    if (message.content.toLowerCase().startsWith(`${prefix}playnow `) || message.content.toLowerCase().startsWith(`${prefix}pn `)) {
        const executenow = require('./executenow.js')
		executenow(message, play, serverQueue, queue);
	} else if (message.content.toLowerCase().startsWith(`${prefix}play `) || message.content.toLowerCase().startsWith(`${prefix}p `)) {
        const execute = require('./execute.js')
		execute(message, play, serverQueue, queue);
	} else if (message.content.toLowerCase() == `${prefix}skip`) {
        const skip = require('./skip.js')
		skip(message, serverQueue);
	} else if (message.content.toLowerCase() == `${prefix}stop` || message.content.toLowerCase() == `${prefix}leave`) {
        const stop = require('./stop.js')
		stop(message, serverQueue);
	} else if (message.content.toLowerCase() == `${prefix}queue` || message.content.toLowerCase() == `${prefix}q`) {
        const queue = require('./queue.js')
		queue(message, serverQueue);
	} else if (message.content.toLowerCase() == `${prefix}nowplaying` || message.content.toLowerCase() == `${prefix}np`) {
        const nowplaying = require('./nowplaying.js')
		nowplaying(message, client, serverQueue);
	} else if (message.content.toLowerCase().startsWith(`${prefix}volume`) || message.content.toLowerCase().startsWith(`${prefix}vol`)) {
        const volume = require('./volume.js')
		volume(message);
	} else if (message.content.toLowerCase().startsWith(`${prefix}eval`)) {
        if (message.author.id === config.owner){
            const eval_cmd = require('./eval.js')
            eval_cmd(message, client, prefix)
        } else {
            message.react('❎')
        }
    } else if (message.content.toLowerCase().startsWith(`${prefix}update`)) {
        if (message.author.id === config.owner){
            const update = require('./update.js')
            update(message, client, prefix)
        } else {
            message.react('❎')
        }
    } else {
		message.react('❎')
	}
}

module.exports = cmds_index
