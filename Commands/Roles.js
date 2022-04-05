// Require the necessary discord.js classes
const { MessageEmbed } = require("discord.js");

module.exports = {
  //Command: subscribe
  subscribe: function (message) {
    let role = message.guild.roles.cache.find(r => r.name === "Tag Me");
    message.member.roles.add(role);
    
    message.reply("You have subscribed to the ping list!");
  },
  //Command: unsubscribe
  unsubscribe: function (message) {
    let role = message.guild.roles.cache.find(r => r.name === "Tag Me");
    message.member.roles.remove(role);

    message.reply("You have been unsubscribed from the ping list!");
  },
}