module.exports = {
	name: 'deadchat',
	description: 'Use this command when the chat is dead',
	execute(message) {
		let montecarlo = Math.floor(Math.random()*3)
		message.channel.send('Mods, can we get a dead chat ping here?');
		if (montecarlo == 0) {
    			message.channel.send('https://tenor.com/view/dead-chat-gif-21398098');
		}
		if (montecarlo == 1) {
    			message.channel.send('https://tenor.com/view/dead-chat-gif-21375725');
		}
		if (montecarlo == 2) {
    			message.channel.send('https://tenor.com/view/dead-chat-xd-dead-chat-plague-doctor-scp049-gif-20796096');
		}
		if (montecarlo == 3) {
    			message.channel.send('https://tenor.com/view/nikocado-avocado-nikocado-mental-breakdown-mukbang-rage-mukbang-gif-21266615');
		}
    		message.channel.send('EVERYBODY WAKE THE FUCK UP!');
	},
};
