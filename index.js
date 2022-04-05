//require the necessary discord.js classes
const { Client, Intents, MessageEmbed, Permissions } = require("discord.js");

//create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// from settings
const config = require("./config.json");
const token = require("./token.json");
const prefix = config.prefix;

//commands
var Fun = require('./Commands/Fun.js');
var Help = require('./Commands/Help.js');
var Admin = require('./Commands/Admin.js');
var Roles = require('./Commands/Roles.js');

const commands = [
  ["help", Help.help],
  ["subscribe", Roles.subscribe],
  ["unsubscribe", Roles.unsubscribe],
];

client.once("ready", () => {
  console.log("The bot is running. Press CTRL + C to stop the bot.");
  client.user.setUsername(config.botName);
  client.user.setActivity(">help", { type: "LISTENING" });
});

client.on('messageCreate', message => {
  //if the message came from this bot then dont check this message for commands
  if (message.author.tag == client.user.tag){
    return;
  }

  //check if it is a command
  if (message.content.startsWith(prefix)){
    console.log(message.author.tag + " send message in " + message.channel.name + ": " + message.content);

    for (var i = 0; i < commands.length; i++){
      var command = commands[i];
      if (message.content.startsWith(prefix + command[0])) {
        //found command
        command[1](message);
        return;
      }
    }
    message.reply("Unknown command. Please type " + prefix + "help for all the commands");
  }
});

client.login(token.token);