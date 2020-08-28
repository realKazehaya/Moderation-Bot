const Discord = require("discord.js");
const client = new Discord.Client();
let prefix = process.env.PREFIX;

client.on('ready' () => {
  console.log("Starting...")
});

client.on('message' message => {

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(' ')
  const command = args.shift().toLowerCase();


});

client.login(process.env.TOKEN)
