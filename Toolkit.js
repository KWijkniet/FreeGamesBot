// require the necessary discord.js classes
const { Permissions } = require("discord.js");

// from config
const secret = require("./Config/secret.json");
const config = require("./Config/config.json");

module.exports = {
	getArguments: function (message) {
		// get all arguments and store them in an array
		var parts = message.content.split(" ");
		parts.shift();
		return parts;
	},
	invalidArguments: function(message, commandInfo){
		message.reply("Invalid arguments. Command usage: " + commandInfo);
	},
	hasPermissions: function(message){
		return message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR);
	},
	hasRole: function(message, targetRoleName){
		return message.member.roles.cache.find(r => r.name === targetRoleName) != null;
	},
	getTime: function(){
		let date_time = new Date();
		// get current date
		// adjust 0 before single digit date
		let date = ("0" + date_time.getDate()).slice(-2);
		// get current month
		let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
		// get current year
		let year = date_time.getFullYear();
		// get current hours
		let hours = date_time.getHours();
		// get current minutes
		let minutes = date_time.getMinutes();
		// get current seconds
		let seconds = date_time.getSeconds();

		return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
	}
}