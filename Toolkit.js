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
}