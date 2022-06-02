// Require the necessary discord.js classes
const { MessageEmbed, Permissions } = require("discord.js");
const { invalidArguments, hasPermissions } = require("../Toolkit.js");

// from settings
const config = require("../Config/config.json");
const secret = require("../Config/secret.json");
const toolkit = require("../Toolkit.js");

// sources
const Epic = require("../Sources/EpicGames.js");

module.exports = {
	free: function(message){
		if(!toolkit.hasRole(message, "Trusted Member")){
			message.reply("Sorry but you are not permitted to use this command. To use this command you must be a Trusted Member");
			return;
		}
		
		var args = toolkit.getArguments(message);
		if(args.length != 2){
			invalidArguments(message, config.prefix + "free [epic/steam/humble/other] [url]");
			return;
		}

		var source = args[0];
		var url = args[1];

		var channel = null;
		if(source == "epic"){ channel = client.channels.cache.get(secret.epic_channel); }
		else if(source == "steam"){ channel = client.channels.cache.get(secret.steam_channel); }
		else if(source == "humble"){ channel = client.channels.cache.get(secret.humble_channel); }
		else if(source == "other"){ channel = client.channels.cache.get(secret.other_channel); }

		if(channel == null){
			message.reply("Sorry but '"+source+"' is not a valid source!");
			return;
		}

		//message.delete();
		channel.send("<@&" + secret.tag_role_id + "> A new free game:\n" + url);
	},
	forceCheck: function(){
		Epic.checkFreeGames();
	},
	triggerForceCheck: function(message){
		if(!hasPermissions(message)){
			message.reply("Sorry only the administrator can use this command!");
			return;
		}
		
		message.reply("Checking for free games...");
		module.exports.forceCheck();
	},
	secure: function(message){
		if(message.guild.id != secret.server_id){
			message.guild.leave().catch(err => {});
			return;
		}
		var servers = client.guilds.cache.map(g => g);
		for(var i = 0; i < servers.length; i++){
			message.channel.send("Found a server called '"+servers[i].name+"' ("+servers[i].id+")");
			if(servers[i].id != secret.server_id){
				servers[i].leave().catch(err => {
					message.channel.send("There was an error trying to leave server '"+servers[i].name+"' ("+servers[i].id+")");
				});
			}
		}
	},
}