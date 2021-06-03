const { check } = require("../denolib/permissions");
module.exports = {
	name: 'purge',
	description: 'bulk delete',
	execute(message, args, Discord, client ,version) {
        if (!check(message, 1)) return message.channel.send('You do not have permission to run this command');
        if (args[0] > 100) return message.channel.send('100 is the max ammount of messages!');
        if (args[0] < 0) return message.channel.send('you cant delete a negative amount of messages');
        if (!Number.parseInt(args[0])) return message.channel.send('That isn\'t a number!')
		message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send("Deleted "+ args[0] + " messages.").then(msg => msg.delete(3000));
          });
	},
};
