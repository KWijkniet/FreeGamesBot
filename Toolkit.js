// require the necessary discord.js classes
const { Permissions } = require("discord.js");

// require Axios
const axios = require('axios').default;

// from settings
const config = require("./config.json");

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
  getEpicGames: function(){

	return new Promise((res, rej) => {
		axios.get('https://store-site-backend-static-ipv4.ak.epicgames.com/freeGamesPromotions?locale=en-US&country=NL&allowCountries=NL')
		.then((response) => {
			var returnData = [];
			var data = response.data;
			var items = data["data"]["Catalog"]["searchStore"]["elements"];
			for(var i = 0; i < items.length; i++){
				var elem = items[i];
	
				var priceData = elem["price"]["totalPrice"];
				var result = {
					"title": elem["title"],
					"originalPrice": priceData["originalPrice"],
					"discountedPrice": priceData["discountPrice"],
				}
	
				if(result.originalPrice > 0 && result.discountedPrice == 0){
					returnData.push(result);
				}
			}
			res(returnData);
		})
		.catch((err) =>{
			rej(err);
		})
	});
	  
	//https://store.epicgames.com/en-US/free-games
	axios.get('https://store-site-backend-static-ipv4.ak.epicgames.com/freeGamesPromotions?locale=en-US&country=NL&allowCountries=NL')
	.then(function (response) {
		
	})
	.catch(function (error) {
		console.log(error);
		return "Error";
	});
  },
}