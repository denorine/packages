module.exports = {
	name: 'eval',
	description: 'run code in discord',
	execute(message, args, Discord, client ,version) {
        if(!client.guilds.cache.get('824840686032912450').members.cache.get(message.author.id).roles.cache.has('824863199387713547')) return message.channel.send('you do not have eval perms'); // returns if using isnt gex
        try {
            const code = args.join(" ");
            let evaled = eval(code);
     
            if (typeof evaled !== "string") {
                evaled = require("util").inspect(evaled);
            }
            message.channel.send('code executed');
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
        }
	},
};
