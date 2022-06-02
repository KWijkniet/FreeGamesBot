// Require the necessary discord.js classes
const { MessageEmbed } = require("discord.js");

// require Axios
const axios = require('axios').default;
const fs = require("fs");
const toolkit = require("./../Toolkit.js");

// from config
const secret = require("../Config/secret.json");

module.exports = {
	checkFreeGames: function() {
		module.exports.getEpicGames().then((games) => {
			fs.readFile("Logs/EpicGames.txt", 'utf8', (err, data) => {
				if (err) { console.log(err); return; }
				
				var lines = [];
				if (data != null && data.length > 0) {
					lines = data.split("\n");
				}

				var hasTagged = false;
				for (var r = 0; r < games.length; r++) {
					var game = games[r];
					var hasFound = false;

					for (var i = 0; i < lines.length; i++) {
						var json = JSON.parse(lines[i]);

						if (game["title"] == json["title"]) {
							hasFound = true;
							break;
						}
					}

					if (!hasFound) {
						if(hasTagged == false){
							hasTagged = true;
							client.channels.cache.get(secret.epic_channel).send("<@&" + secret.tag_role_id + ">");
						}
						
						var url = (game.type == "BUNDLE" ? secret.epic_base_bundle : secret.epic_base_game) + game["slug"];

						const embed = new MessageEmbed()
							.setTitle(game["title"])
							.setDescription("[" + game['title'] + "](" + url + ") has just become free! Click the title to claim now.")
							.setImage(game["image"])
							.setURL(url);
						client.channels.cache.get(secret.epic_channel).send({ embeds: [embed] });
						lines.push(JSON.stringify(game));

						fs.readFile("Logs/Log.txt", 'utf8', (err2, data2) => {
							var l = [];
							if (data2 != null && data2.length > 0) {
								l = data2.split("\n");
							}
							l.push(toolkit.getTime() + " [BOT]: Posted a free game: " + game["title"]);
							
							fs.writeFile('Logs/Log.txt', l.join("\n"), (err) => {
								if (err) console.log(err);
							});
						});
					}
				}
				fs.writeFile('Logs/EpicGames.txt', lines.join("\n"), (err) => {
					if (err) console.log(err);
				});
			});
		});
	},
	getEpicGames: function() {
		return new Promise((res, rej) => {
			axios.get(secret.epic_url).then((response) => {
				var returnData = [];
				var data = response.data;
				var items = data["data"]["Catalog"]["searchStore"]["elements"];
				for (var i = 0; i < items.length; i++) {
					var elem = items[i];
					var priceData = elem["price"]["totalPrice"];
					var result = {
						"title": elem["title"],
						"originalPrice": priceData["originalPrice"],
						"discountedPrice": priceData["discountPrice"],
						"slug": elem["productSlug"] != null && elem["productSlug"].length > 0 ? elem["productSlug"] : elem["offerMappings"][0]["pageSlug"],
						"image": elem["keyImages"][0]["url"],
						"type": elem["offerType"],
					}

					if (result.originalPrice > 0 && result.discountedPrice == 0) {
						returnData.push(result);
					}
					else if (items.length <= 6 && elem["promotions"]["promotionalOffers"].length > 0) {
						returnData.push(result);
					}
				}
				res(returnData);
			}).catch((err) => {
				rej(err);
			});
		});
	},
}