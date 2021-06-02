const Discord = require('discord.js')
module.exports = {
    	/** JS Doc for Intellisense
	 * @param {Discord.client} client
	 */
    reloadCommands(client) {
        const fs = require('fs');
        const commandFiles = fs.readdirSync('src/commands').filter(file => file.endsWith('.js'));
        client.commands.clear();
		for (const file of commandFiles) {
            try {
                delete require.cache[require.resolve(`../commands/${file}`)]
            } catch (e) {
                console.log(`This error is expected!\n${e}`)
            }
            
            const command = require(`../commands/${file}`);
            client.commands.set(command.name, command);
        }
    }
}
