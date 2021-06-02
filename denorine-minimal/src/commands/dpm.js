const { mfaAuthn } = require("mfa.js");
const { reloadCommands } = require("../denolib/hotstart");
const { check } = require("../denolib/permissions");

module.exports = {
	name: 'dpm',
	description: 'dpm',
	execute(message, args, Discord, client ,version) {
		if (!check(message, 3)) return message.reply("You are missing Deployer Permissions");
		message.reply("Please Enter 2FA code:") // Note to self, comment this one day
		let sessionActivate = false;
		let attempts = 0;
		const filter = m => m.author == message.author;
		const collector = message.channel.createMessageCollector(filter, { time: 60000 });
		
		collector.on('collect', m => {
			console.log(m.content)
			if (!sessionActivate){
				if (attempts <= 3) {
					
					if (mfaAuthn(message.author.id, m.content)) {
						proceed();
						sessionActivate = true;
					} else {
						attempts++;
						if(attempts == 3) {
							message.reply("Final Attempt")
						} else message.reply("2fa code invalid Attempts " + (4-(attempts)) + "/4 left")
						if (attempts == 4) {
							message.reply("Failed 2fa") 
						}
						

					}
				}
			}
		});
		const fetch = require("node-fetch");
		const fs = require('fs');
		const npm = require('npm');

		function proceed() {
			function update(package) {
				fetch(`https://raw.githubusercontent.com/denorine/packages/main/${args[1]}/dpm`)
				.then(res => res.json())
				.then(json => {
				const installMessage = new Discord.MessageEmbed()
					.setColor('#0eddf6')
					.setTitle('Installing Denorine Package')
					.setDescription(`Installing Package ${json.Name}`)
					.setFooter(json.Description);
				message.channel.send(installMessage);
				npm.load(function(err) {
					npm.commands.install(json["npm-dependencies"], function(er) {
					  console.log(er)
					});
				});
				json["dpm-dependencies"].forEach(dep=>{ //install dpm-depends
					//update(dep) // actually do the hard work
				}) 
				json.files.forEach(e => {
					fetch(`https://raw.githubusercontent.com/denorine/packages/main/${args[1]}/${e}`)
						.then(res => res.text())
						.then(js=> {
							fs.writeFileSync(`./${e}`, js, function(err, result) {
								if(err) console.log('error', err);
							  });
							  reloadCommands(client);
						}) 
				})
				
				message.reply("Finished Installing")
			})
			}
			function sideload(package) {
				fetch(`${package}/dpm`) // Fetch POackage info from custom repo
				.then(res => res.json()) // then parse
				.then(json => { // then..
				const installMessage = new Discord.MessageEmbed() //Discord Embed and all the jazz
					.setColor('#0eddf6') // Color -> Aqua Blue
					.setTitle('Installing Denorine Package')
					.setDescription(`Installing Package ${json.Name}`)
					.setFooter(json.Description); 
				message.channel.send(installMessage); //Send embed
				npm.load(function(err) {
					npm.commands.install(json.npm-dependencies, function(er) {
					  console.log(er)
					});
				});
				json.dpm-dependencies.forEach(p=>{ //install dpm-depends
					update(p) // actually do the hard work
				}) 
				json.files.forEach(e => {
					fetch(`${package}/${e}`)
						.then(res => res.text())
						.then(js=> {
							fs.mkdir(e.substr(0,e.split("/")[e.split("/").length-1].length+2), { recursive: true }, (err) => { //make dir
								if (err) throw err; //you fucked up
							})
							fs.writeFileSync(`./${e}`, js, function(err, result) {
								if(err) console.log('error', err);
							});
			
							//client.commands.get("hotstart").execute(message, args, Discord, client, version);
						}) 
				})
				message.reply("Finished Installing")
			})
			}
			function remove() {
				message.reply('Package DB not found')
			}
			switch (args[0]) {
				case "install":
					update(args[1]);
					break;
				case "remove":
					remove();
					break;
				case "update":
					update(args[1]);
					break;
				case "sideload":
					sideload(args[1]);
					break;
			}
		}
	},
};
