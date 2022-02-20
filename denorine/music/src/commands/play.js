const ytdl = require('ytdl-core-discord');
const ytSearch = require('yt-search');

const queue = new Map();

module.exports = {
    name: 'playtest',
    aliases: ['play', 'skip', 'stop'],
    description: 'Advanced music bot',
    async execute(message, args, Discord, client, version, cmd) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.channel.send('You need to be in a voice channel!');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('You dont have the correct permissions for this command');

        const serverQueue = queue.get(message.guild.id);

        if (cmd === 'play') {
            if (!args.length) return message.channel.send('No video!');
            let song = {};

            if (ytdl.validateURL(args[0])) {
                const songInfo = await ytdl.getInfo(args[0]);
                song = { title: songInfo.videoDetails.title, url: songInfo.videoDetails.video_url }
            } else {
                const videoFinder = async (query) => {
                    const videoResult = await ytSearch(query);
                    return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
                }

                const video = await videoFinder(args.join(' '));
                if (video) {
                    song = { title: video.title, url: video.url }
                } else {
                    message.channel.send('Couldnt find that video!');
                }
            }

            if (!serverQueue) {
                const queueConstructor = {
                    voiceChannel: voiceChannel,
                    textChannel: message.channel,
                    connection: null,
                    songs: []
                }

                queue.set(message.guild.id, queueConstructor);
                queueConstructor.songs.push(song);

                try {
                    const connection = await voiceChannel.join();
                    queueConstructor.connection = connection;
                    videoPlayer(message.guild, queueConstructor.songs[0]);


                } catch {
                    queue.delete(message.guild.id);
                    message.channel.send('There was a critical error connecting!');
                    throw err;
                }
            } else {
                serverQueue.songs.push(song);
                return message.channel.send(`**${song.title}** added to queue!`);
            }
        }

        else if (cmd === 'skip') {
            skipSong(message, serverQueue);
        }

        else if (cmd === 'stop') {
            stopSong(message, serverQueue);
        }
    }
}

const videoPlayer = async (guild, song, message) => {
    const songQueue = queue.get(guild.id);

    if (!song) {
        songQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    try {
    const stream = await ytdl(song.url, {filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1<<25});

    songQueue.connection.play(stream, { type:'opus', seek: 0, highWaterMark: 1})
        .on('finish', () => {
            songQueue.songs.shift();
            videoPlayer(guild, songQueue.songs[0]);
            
        });
    } catch (e) {
        songQueue.textChannel.send("There was a critical error playing this title, is there a content warning or age restriction? try playing a different video\n\n more details below (developer only)")
        songQueue.textChannel.send(`\`\`\`${e}\`\`\``)
        
    }
    songQueue.textChannel.send(`This denorine plugin is still a work in progress, please report bugs at <https://github.com/denorine/packages/issues>`)
    await songQueue.textChannel.send(`Now playing **${song.title}**`);
};


const skipSong = async (message, serverQueue) => {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send('You need to be in a voice channel!');
    if (!serverQueue) {
        return message.channel.send("No songs in the queue!");
    }
    serverQueue.connection.dispatcher.end();
}

const stopSong = (message, serverQueue) => {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send('You need to be in a voice channel!');
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
}
