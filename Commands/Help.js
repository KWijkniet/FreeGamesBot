// Require the necessary discord.js classes
const { MessageEmbed } = require("discord.js");

// from settings
const config = require("../Config/config.json");

module.exports = {
	//Command: help
	help: function (message) {
		const embed = new MessageEmbed()
			.setTitle("Commands")
			.setDescription("List of all the commands")
			.addField(config.prefix + "help", "Get a list of all the commands.", true)
			.addField(config.prefix + "subscribe", "receive pings when free games are posted.", true)
			.addField(config.prefix + "unsubscribe", "Stop receiving pings when free games are posted.", true)
			.addField("Trusted Members", "These commands are only available to trusted members", false)
			.addField(config.prefix + "free [epic/steam/humble/other/sale] [url]", "Post a free game", true)
			.setTimestamp();
		message.channel.send({ embeds: [embed] });
	},
}