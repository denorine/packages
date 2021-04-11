module.exports = {
	name: 'ban',
	description: 'real ban',
	execute(message, args, Discord) {
		if(!message.member.roles.cache.find(r => r.name === 'gex')) return message.channel.send('you aren\'t gex'); // returns if using isnt gex
		message.delete();
		const taggedUser = message.mentions.users.first();
		const member = message.guild.member(taggedUser);
		let reason = args.slice(1).join(' ');
		

        
		const BanMessage = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Succesfully banned user')
			.setDescription(`Banned ${taggedUser}\nReason: \`${reason} \``)
                        .setFooter(`this action was performed by a moderator`);
            
        try{
		    message.mentions.members.first().send(`You were banned for: \`${reason}\`.\n \n \n \nIf you believe you were wrongfully banned, please fill out our ban appeal form: https://forms.gle/j35D5jh9JsA9C3ak7`).then(() => {
                member.ban({reason: reason});
                message.channel.send(BanMessage);
            }).catch(function(){
		    	member.ban({reason: reason});
			    message.channel.send(BanMessage);
		    });  
        } catch {
            message.channel.send('unable to ban, user most likely is already banned or left the server use z!idban next update');
            //message.guild.members.ban(member,reason);
        }

        
        

	},
};
