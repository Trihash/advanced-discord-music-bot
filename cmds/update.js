const Discord = require('discord.js')
const shell = require('shelljs')

function stop(message, client, prefix) {
    try {
        message.channel.startTyping()
        shell.exec('git pull && pm2 reload index.js', {silent:false}, function(code, stdout, stderr) {
            message.reply(`Output:\n\`\`\`${stdout}${stderr}\`\`\``).then(m=>message.channel.stopTyping(true));
        });
    } catch (err) {
        message.reply(`❌ Update **__ERROR__**`);
        message.channel.stopTyping(true)
    }
}

module.exports = stop