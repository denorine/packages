
const Discord = require('discord.js');
const enmap = require('enmap');
const {prefix} = require('../../config.json');

const settings = new enmap({
    name: "settings",
    autoFetch: true,
    cloneLevel: "deep",
    fetchAll: true
});

module.exports = {
	/** 
	*@param {Discord.Client} client
	*/
	execute(client) {
        client.on('message', async message => {
            if(message.author.bot) return;
            if(message.content.indexOf(prefix) !== 0) return;
        
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
        
            if(command == "setup") {
                // ticket-setup #channel
        
                let channel = message.mentions.channels.first();
                if(!channel) return message.reply("Usage: `at?setup #channel`");
        
                let sent = await channel.send(new Discord.MessageEmbed()
                    .setTitle("Ticket System")
                    .setDescription("Press on the reaction to create a ticket")
                    .setFooter("Made with ♡ by ezzwaytropical#0069 | Version 0.1")
                    .setColor("5865f2")
                );
        
                sent.react('🎫');
                settings.set(`${message.guild.id}-ticket`, sent.id);
        
              message.channel.send("The bot for this server was successfully setup and is now usable. If you encounter errors, Please report it on our Support Server https://www.advancedtickets.ga/discord")
            }
        
            if(command == "close") {
                if(!message.channel.name.includes("ticket-")) return message.channel.send("You cant use that here")
                message.channel.delete();
            }
        });
        client.on('messageReactionAdd', async (reaction, user) => {
            if(user.partial) await user.fetch();
            if(reaction.partial) await reaction.fetch();
            if(reaction.message.partial) await reaction.message.fetch();
        
            if(user.bot) return;
        
            let ticketid = await settings.get(`${reaction.message.guild.id}-ticket`);
        
            if(!ticketid) return;
        
            if(reaction.message.id == ticketid && reaction.emoji.name == '🎫') {
                reaction.users.remove(user);
        
                reaction.message.guild.channels.create(`ticket-${user.username}`, {
                    permissionOverwrites: [
                        {
                            id: user.id,
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                        },
                        {
                            id: reaction.message.guild.roles.everyone,
                            deny: ["VIEW_CHANNEL"]
                        }
                    ],
                    type: 'text'
                }).then(async channel => {
                    channel.send(`<@${user.id}>`, new Discord.MessageEmbed().setTitle("The Staff Team is here for you!").setDescription("Please describe your problem now.").setColor("#5865f2"))
                })
            }
        });
  }
}
