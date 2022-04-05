// require Axios
const axios = require('axios').default;

// from config
const secret = require("../Config/secret.json");

module.exports = {
	checkFreeGames: function(){
		this.getEpicGames().then((games)=>{
			console.log(games);
		});	
	},
	getEpicGames: function(){
		return new Promise((res, rej) => {
			axios.get(secret.epic_url)
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
	},
}