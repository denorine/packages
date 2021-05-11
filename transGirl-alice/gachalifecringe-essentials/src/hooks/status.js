const Discord = require("discord.js");

module.exports = {
	/** 
	*@param {Discord.Client} client
	*/
	execute(client) {
		client.once('ready', async () => {
			client.user.setActivity("Gacha Cringe", {
				type: "WATCHING",
			  });
		});
	}
}
