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

  if(command === 'ban'){
  
     if (!message.guild.me.permissions.has('BAN_MEMBERS')) {
  return message.channel.send('I don't have permission to ban people.')
}

if (!message.member.permissions.has('BAN_MEMBERS')) {
  return message.channel.send('Sorry, but you are not allowed to ban people.')
}

let persona = message.mentions.members.first() || 
  message.guild.members.resolve(args[0])

if (!persona) {
  return message.channel.send('You must mention someone to ban.')
} else if(!persona.bannable){
  return message.channel.send('I can't ban this person.')
}else if (persona.roles.highest.comparePositionTo(message.member.roles.highest) > 0) {
  return message.channel.send('This person is on the same or higher level of hierarchy as you, you cannot ban him.')
}

var razon = args.slice(1).join(' ')
if (!razon) {
  razon = 'Reason not specified.'
}

razon += `, Banned from ${message.author.tag}`

message.guild.members.ban(member, {
  reason: razon
})
  .catch(e => message.reply('**Error.**'))
  .then(() => {
    message.channel.send(`**${member.user.tag}**, Benned.`)
  })
  }

  if(command === 'kick'){
  
    let user = message.mentions.users.first();
let razon = args.slice(1).join(' ');

var perms = message.member.hasPermission("KICK_MEMBERS");

if(!perms) return message.channel.send("You do noname someone to use this command.");
if (message.mentions.users.size < 1) return message.reply('You must mention someone.').catch(console.error);

if (!razon) return message.channel.send('Escriba una razón, `-kick @username [razón]`');
if (!message.guild.member(user).kickable) return message.reply('I can't kick the mentioned user.');
     
message.guild.member(user).kick(razon);
message.channel.send(`**${user.username}**, was kicked from the server, reason: ${razon}.`);
    
  }
       
    if(command === "unban"){
    if(!msg.member.hasPermission("BAN_MEMBERS")) {
      return message.channel.send(`**${message.author.username}**, You do not have perms to unban someone.`)
    }
    
    if(!msg.guild.me.hasPermission("BAN_MEMBERS")) {
      return message.channel.send(`**${message.author.username}**, I do not have perms to unban someone.`)
    }
    
    let userID = args[0]
      message.guild.fetchBans().then(bans=> {
      if(bans.size == 0) return 
      let bUser = bans.find(b => b.user.id == userID)
      if(!bUser) return
      message.guild.members.unban(bUser.user)
})
    
  ;}

});

client.login(process.env.TOKEN)
