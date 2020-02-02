const Discord = require("discord.js");

 function clean(text) {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

 function eval_cmd(message, client, prefix) {
    if (message.content.startsWith(prefix + "eval")) {
        try {
            const args = message.content.split(" ").slice(1);
            if (args.length < 1) return message.react('❌');
            const code = args.join(" ");
            let evaled = eval(code);

             if (typeof evaled !== "string"){
                evaled = require("util").inspect(evaled);
            }
             message.channel.send(`\`\`\`${clean(evaled).substring(0, 1800)}\`\`\``);
            
       } catch (err) {
            const args = message.content.split(" ").slice(1);
            const code = args.join(" ");
            message.channel.send(`\`\`\`${clean(err).substring(0, 1800)}\`\`\``);
        }
    }
 }

 module.exports = eval_cmd;
