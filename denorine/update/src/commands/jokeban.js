module.exports = {
	name: 'jokeban',
	description: 'fake ban',
	execute(message, args, Discord) {
		if(!message.member.roles.cache.find(r => r.name === 'gex')) return message.channel.send('you aren\'t gex');
		message.delete();
		const taggedUser = message.mentions.users.first();
		let reason = args.slice(1).join(' ');
        const BanMessage = new Discord.MessageEmbed()
	        .setColor('#0099ff')
	        .setTitle('Succesfully Banned User')
	        .setDescription(`Banned ${taggedUser}\nReason: \`${reason} \``)
	        .setFooter(`this action is a joke, do not take it seriously`);

		message.channel.send(BanMessage);
	},
};
