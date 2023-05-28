const http = require("http");

//require the necessary discord.js classes
const { Client, Intents, MessageEmbed, Permissions } = require("discord.js");
//create a new client instance
//global.client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
var client = global.client;

const toolkit = require("./Toolkit.js");
const fs = require("fs");

// from settings
const config = require("./Config/config.json");
const secret = require("./Config/secret.json");
const prefix = config.prefix;

//commands
//var Fun = require('./Commands/Fun.js');
var Help = require('./Commands/Help.js');
var Admin = require('./Commands/Admin.js');
var Roles = require('./Commands/Roles.js');

const commands = [
	["help", Help.help],
	["subscribe", Roles.subscribe],
	["unsubscribe", Roles.unsubscribe],
	["free", Admin.free],
	["forceCheck", Admin.triggerForceCheck],
	["secure", Admin.secure],
];

//On bot ready
client.once("ready", () => {
	client.user.setUsername(config.botName);
	client.user.setActivity(">help", { type: "LISTENING" });
	console.log("The bot is running. Press CTRL + C to stop the bot.");

	//http.createServer((_, res) => res.end("Alive")).listen(8080);

	//Auto check the websites for new free games
	setInterval(() => {
		Admin.forceCheck();
	}, 1000 * 60 * 60 * 1) // each hour
});

//On user join
client.on('guildMemberAdd', member => {
	client.channels.cache.get(secret.welcome_channel_id).send("Welcome <@" + member.id + ">! Enjoy the free games");
});

client.on('guildMemberRemove', member => {
	client.channels.cache.get(secret.welcome_channel_id).send("I am sad to announce that <@" + member.id + "> has left this server");
});

client.on('messageCreate', message => {
	//if the message came from this bot then dont check this message for commands
	if (message.author.tag == client.user.tag) {
		return;
	}

	//check if it is a command
	if (message.content.startsWith(prefix)) {
		console.log(message.author.tag + " send message in " + message.channel.name + ": " + message.content);

		for (var i = 0; i < commands.length; i++) {
			var command = commands[i];
			if (message.content.startsWith(prefix + command[0])) {
				//check if the command was send in the correct server
				if (message.guild.id != secret.server_id) {
					message.reply("Sorry. This bot can only be used in the 'Free Games' discord server: " + secret.server_url);
					Admin.secure(message);
					return;
				}

				//Log command
				fs.readFile("Logs/Log.txt", 'utf8', (err2, data) => {
					var lines = [];
					if (data != null && data.length > 0) {
						lines = data.split("\n");
					}
					lines.push(toolkit.getTime() + " [" + message.author.username + "]: " + message.content);

					fs.writeFile('Logs/Log.txt', lines.join("\n"), (err) => {
						if (err) console.log(err);
					});
				});

				//found command
				command[1](message);
				return;
			}
		}
		//message.reply("Unknown command. Please type " + prefix + "help for all the commands");
	}
});

//If code doesn't go past this line. Execute "kill 1" in replit
//client.login(secret.token);
client.login(secret.token);