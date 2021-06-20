module.exports = {
    name: 'vote',
    description: 'creates a mod vote',
    execute(message, args, Discord){
            message.delete()

            // JANKTASTIC
            var voteContents = message.content.substring('z!vote'.length); 

            const voteEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Vote by ${message.author.username}`)
                .setAuthor(message.author.username)
                .setDescription(voteContents)
                .setTimestamp()
                .setFooter('Cringe Powered');

            message.channel.send({embed: voteEmbed}).then(voteEmbed => {
                voteEmbed.react("✅")
                voteEmbed.react("❌");
            });

            const filter = (reaction, user) => {
                return reaction.emoji.name === '✅' && user.id === message.author.id;
            };
            
            message.awaitReactions(filter, { max: 4, time: 60000, errors: ['time'] })
                .then(collected => console.log(collected.size))
                .catch(collected => {
                    message.channel.send(`After a minute, only ${collected.size} out of 4 reacted.`);
                });
            
    }
}
