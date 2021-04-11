module.exports = {
	name: 'restart',
	description: 'exit',
	execute(message, args, Discord, client ,version) {
		if(!message.member.roles.cache.find(r => r.name === 'gex')) return message.channel.send('You do not have gex.');
        process.exit();
	},
};
