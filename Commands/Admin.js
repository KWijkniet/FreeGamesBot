// Require the necessary discord.js classes
const { MessageEmbed, Permissions } = require("discord.js");
const { invalidArguments } = require("../Toolkit.js");

// from settings
const config = require("../config.json");
const toolkit = require("../Toolkit.js");

module.exports = {
  // getId: function (message) {
  //   if(!toolkit.hasPermissions(message)){
  //     message.reply("Sorry! You dont have permission to use this command!");
  //     return;
  //   }
      
  //   var args = toolkit.getArguments(message);
  //   if(args.length != 1){
  //     invalidArguments(message, config.prefix + "getId [server/channel]");
  //     return;
  //   }

  //   if (args[0] == "server") {
  //     message.reply("Server ID: " + message.guildId);
  //   }
  //   else if (args[0] == "channel") {
  //     message.reply("Channel ID: " + message.channelId);
  //   }
  //   else {
  //     message.reply("Unknown argument: " + args[0]);
  //   }
  //   console.log(message.content);
  // },
}