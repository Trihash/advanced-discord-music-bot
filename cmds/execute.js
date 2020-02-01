const Discord = require('discord.js')
const ytdl = require('ytdl-core')
const ytsr = require('ytsr')

async function execute(message, play, serverQueue, queue) {
    try {
	let args = message.content.split(' ');
	args.shift();
    
    if (args.length < 1) return message.channel.send('Need search')

	const voiceChannel = message.member.voiceChannel;
	if (!voiceChannel) return message.channel.send('You need to be in a voice channel to play music!');
	const permissions = voiceChannel.permissionsFor(message.client.user);
	if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
		return message.channel.send('I need the permissions to join and speak in your voice channel!');
	}

	let filter;
 
	ytsr.getFilters(args.join(' '), function(err, filters) {
  		if(err) throw err;
    	filter = filters.get('Type').find(o => o.name === 'Video');
  		ytsr.getFilters(filter.ref, function(err, filters) {
    		if(err) throw err;
  				filter = filters.get('Duration').find(o => o.name.startsWith('Short'));
  				var options = {
  					limit: 5,
  					nextpageRef: filter.ref,
  				}
  			ytsr(null, options, async function(err, searchResults) {
  				if(err){
					  console.error(err)
					  message.channel.send('Error: ' + err)
				}
				console.log(searchResults.items[0])
				
				const songInfo = await ytdl.getInfo(searchResults.items[0].link);
				const song = {
					title: songInfo.title,
					url: songInfo.video_url,
				};
			
				if (!serverQueue) {
					const queueContruct = {
						textChannel: message.channel,
						voiceChannel: voiceChannel,
						connection: null,
						songs: [],
						volume: 100,
						playing: true,
					};
			
					queue.set(message.guild.id, queueContruct);
			
					queueContruct.songs.push(song);
			
					try {
						var connection = await voiceChannel.join();
						queueContruct.connection = connection;
						play(message.guild, queueContruct.songs[0], queue);
					} catch (err) {
						console.log(err);
						queue.delete(message.guild.id);
						return message.channel.send(err);
					}
				} else {
					serverQueue.songs.push(song);
					console.log(serverQueue.songs);
					return message.channel.send(`${song.title} has been added to the queue!`);
				}
  			});
    	});
	});
    
    
    } catch (err) {
        console.error(err)
        message.channel.send('Error')
    }
}

module.exports = execute