const Discord = require('discord.js');
console.log("Loaded entryway")
const verifyChannel = '837507260313108501'; // The entryway channel
const averageRole = '590694158734327839';
// allowed phrases for #entryway
const allowedPhrases = [
	'!I have acknowledged the rules',
	'!i have acknowledged the rules',
	'I have acknowledged the rules',
	'i have acknowledged the rules',
	'!I\'ve acknowledged the rules',
	'ive acknowledged the rules',
	'Ive acknowledged the rules',
	'I‘ve acknowledged the rules'
]; 
module.exports = {
	/** 
	*@param {Discord.Client} client
	*/
	execute(client) {
		client.on('message', message => {
			if(message.channel.id == verifyChannel) { // Check if message as sent in entryway, and if so...
				// return if message was from cringe-bot
				if(message.author.bot) return;
				if(allowedPhrases.includes(message.content)) { // Check the phrase list 
					// Give new user average person role and delete their message
					message.member.roles.add(message.guild.roles.cache.get(averageRole));
					message.author.send('You have gained access to the server!')
					message.delete();
				} else { 
					// Tell them to try again if their phrase was wrong
					message.delete();
					message.author.send(`The phrase you sent in <#${verifyChannel}> was incorrect, did you type it right?`);
				}
			}
		})
	}
}
