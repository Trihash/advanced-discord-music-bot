const Discord = require('discord.js')
const ytdl = require('ytdl-core')

function fetchQueue(message, serverQueue){
    const listarray = [];
    totalcount = 1;
    serverQueue.songs.forEach(song=>{
        if (totalcount === 1) {
            listarray.push(`NOW PLAYING :        ${song.title}`)
        } else {
            listarray.push(`#${totalcount} :                ${song.title}`)
        }
        totalcount++
    })
    return listarray.join("\n")
}

function queue(message, serverQueue) {
	if (!serverQueue) return message.channel.send('There is no queue!');
    message.channel.send(`Queue for ${message.guild.name}:\n\`\`\`css\n` + fetchQueue(message, serverQueue).substring(0, 1800) + `\`\`\`Total songs in queue: ${serverQueue.songs.length}`)
}

module.exports = queue