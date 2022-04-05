// Require the necessary discord.js classes
const { MessageEmbed, Permissions } = require("discord.js");
const { invalidArguments } = require("../Toolkit.js");

// from settings
const config = require("../Config/config.json");
const toolkit = require("../Toolkit.js");

module.exports = {
	free: function(message){
		if(toolkit.hasRole(message, "Tag Me")){
			message.reply("Sorry but you are not permitted to use this command. To use this command you must be a Trusted Member");
			return;
		}
		
		var args = toolkit.getArguments(message);
		if(args.length != 0){
			invalidArguments(message, config.prefix + "free [epic/steam/humble/other/sale] [url]");
			return;
		}
	},
}