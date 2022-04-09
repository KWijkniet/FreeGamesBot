// Require the necessary discord.js classes
const { MessageEmbed, Permissions } = require("discord.js");
const { invalidArguments, hasPermissions } = require("../Toolkit.js");

// from settings
const config = require("../Config/config.json");
const toolkit = require("../Toolkit.js");

// sources
const Epic = require("../Sources/EpicGames.js");

module.exports = {
	free: function(message){
		if(toolkit.hasRole(message, "Tag Me")){
			message.reply("Sorry but you are not permitted to use this command. To use this command you must be a Trusted Member");
			return;
		}
		
		var args = toolkit.getArguments(message);
		if(args.length != 2){
			invalidArguments(message, config.prefix + "free [epic/steam/humble/other/sale] [url]");
			return;
		}

		var source = args[0];
		var url = args[1];

		var channel = null;
		if(source == "epic"){ channel = client.channels.cache.get(secret.epic_channel)}
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
}