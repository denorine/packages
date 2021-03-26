module.exports = {
    name: 'neko',
    description: ':smirk_face:',
    execute(message, args, Discord, client ,version) {
		const fetch = require("node-fetch");
        
        //fetch
        fetch(`https://nekos.life/api/v2/img/${args[0]}`)
            .then(response => response.json()) //json
            .then(response => {
                if (response.url != "") message.reply(response.url).catch(e=> {
                    message.reply(`Command failed to run, did you mess up? \n error log \`\`\`\n ${e}\n\`\`\``);
                });
            }).catch(e => {
                message.reply(`Command failed to run, did you mess up? \n error log \`\`\`\n ${e}\n\`\`\``)
            })
    },
};
