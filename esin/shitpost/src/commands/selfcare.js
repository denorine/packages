module.exports = {
	name: 'selfcare',
	description: 'Reminds you to do a self-care activity',
	execute(message) {
        let activityname = Math.floor(Math.random()*10)
        switch(activityname) {
            case 0:
                message.channel.send('Why not drink a cup of water? You\'ll feel more relaxed.')
                break;
            case 1:
                message.channel.send('Are you hungry? Go grab a snack! It could be fruit yogurt, peaches, apricots, cookies... Anything!')
                break;
            case 2:
                message.channel.send('Take a shower! It makes you a mega chad :sunglasses:')
                break;
            case 3:
                message.channel.send('Have you brushed your hair? If not, do it now or else it\'ll be harder later.')
                break;
            case 4:
                message.channel.send('If you\'re still in pajamas despite it\'s day, I think you should change your outfit, y\'know? I dunno man, being in normal clothes boosts my confidence.')
                break;
            case 5:
                message.channel.send('Just a quick reminder, do you have anything to do, like taking the chicken out the freezer? You\'re welcome.')
                break;
            case 6:
                message.channel.send('If you haven\'t done some exercise today, do so. I like to exercise. I especially like turning around clockwise.')
                break;
            case 7:
                message.channel.send('Don\'t procrastinate! Go study and/or do your homework. Maybe consider exercising if you\'re feeling too energetic to do so.')
                break;
            case 8:
                message.channel.send('What time is it for you? If it\'s late, go to sleep. You\'ll wake up thinking and feeling better.')
                break;
            case 9:
                message.channel.send('Just a suggestion: Maybe read a book?')
        }
	},
};
