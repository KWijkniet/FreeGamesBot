// Require the necessary discord.js classes
const { MessageEmbed } = require("discord.js");

// from settings
const config = require("../config.json");

module.exports = {
  //Command: subscribe
  subscribe: function (message) {
    let role = message.guild.roles.cache.find(r => r.name === "Tag Me");
    message.member.roles.add(role);
  },
  //Command: unsubscribe
  unsubscribe: function (message) {
    let role = message.guild.roles.cache.find(r => r.name === "Tag Me");
    message.member.roles.remove(role);
  },
}