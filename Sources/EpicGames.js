// Require the necessary discord.js classes
const { MessageEmbed } = require("discord.js");

// require Axios
const axios = require('axios').default;
const fs = require("fs");

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
						var url = secret.epic_base + game["slug"];

						const embed = new MessageEmbed()
							.setTitle(game["title"])
							.setDescription("[" + game['title'] + "](" + url + ") has just become free! Click the title to claim now.")
							.setImage(game["image"])
							.setURL(url);
						client.channels.cache.get(secret.epic_channel).send({ embeds: [embed] });
						lines.push(JSON.stringify(game));
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
						"slug": elem["productSlug"],
						"image": elem["keyImages"][0]["url"],
					}

					if (result.originalPrice > 0 && result.discountedPrice == 0) {
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