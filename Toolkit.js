// Require the necessary discord.js classes
const { Permissions } = require("discord.js");

// from settings
const config = require("./config.json");

module.exports = {
  getArguments: function (message) {
    //get all arguments and store them in an array
    var parts = message.content.split(" ");
    parts.shift();
    return parts;
  },
  invalidArguments: function(message, commandInfo){
    message.reply("Invalid arguments. Command usage: " + commandInfo);
  },
  hasPermissions: function(message){
    return message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR);
  }
}