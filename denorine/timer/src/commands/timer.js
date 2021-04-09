module.exports = {
    name: 'timer',
    description: 'just a timer command',
    execute(message, args, Discord, client ,version) {
        const fs = require("fs")
        function toSec(t) {
                switch (t.substr(t.length-1)) {
                    case 'd':
                        return t.slice(0,-1)*86400
                    case 's':
                        return seconds = t.slice(0,-1)
                    case 'm':
                        return seconds = t.slice(0,-1)*60
                    case 'h':
                        return seconds = t.slice(0,-1)*3600
                }
        }
        var sec = toSec(args[0]);
        var timer = setInterval(function(){
            sec--;
            if (sec < 0) {
                message.channel.send(args.join(" "));
                clearInterval(timer);
            }
        }, 1000);
    },
}
