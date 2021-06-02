module.exports = {
	name: 'topic',
	description: 'ask reddit topic generator',
	execute(message, args, Discord, client ,version) {
        if (!check(message, 2)) return message.reply("You are missing Deployer Permissions");
        const fetch = require("node-fetch");
        //fetch
        fetch("https://api.reddit.com/r/askreddit/random.json?sort=top&t=day&limit=1")
            .then(response => response.json()) //json
            .then(response => {
                message.channel.send(response[0].data.children[0].data.title); //parse said json & send message
            }); 
	},
};
