const Discord = require("discord.js");
const client = new Discord.Client();
let prefix = process.env.PREFIX;

client.on('ready', () => {
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

  if(command === 'mute') {
       
    if(message.guild === null)return;
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Couldn't find user.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them please get the manage_messages perm!");
  let muterole = message.guild.roles.find(`name`, "muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("You didn't specify a time!");

  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));

  
    if(command === 'mute'){

             if(message.guild === null)return;

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Couldn't find user.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't unmute them please get the manage_messages perm!");
  let muterole = message.guild.roles.find(`name`, "muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];

  await
  message.channel.send(`<@${tomute.id}> has been unmuted!`)
  (tomute.removeRole(muterole.id));

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));

  }
      
   }
    
       
    if(command === 'purge'){
    
              if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("You can't delete messages....").then(m => m.delete(5000));
        }

        // Check if args[0] is a number
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.reply("Yeah.... That's not a number? I also can't delete 0 messages by the way.").then(m => m.delete(5000));
        }

        // Maybe the bot can't delete messages
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("Sorryy... I can't delete messages.").then(m => m.delete(5000));
        }

        let deleteAmount;

        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteAmount, true)
            .then(deleted => message.channel.send(`I deleted \`${deleted.size}\` messages.`))
            .catch(err => message.reply(`Something went wrong... ${err}`));
    }
}
      
    }

  if(command === 'lockdown'){

             if(message.guild === null)return;

               let role = message.member.hasPermission('MANAGE_MESSAGES')
    if(!message.member.hasPermission('MANAGE_MESSAGES'))
      return message.reply("Sorry, you don't have permissions to use this! please have MANAGE_MESSAGES perm");
  
  
  if (!client.lockit) client.lockit = [];
  let time = args.join(' ');
  let validUnlocks = ['release', 'unlock'];
  if (!time) return message.reply('You must set a duration for the lockdown in either hours, minutes or seconds');

  if (validUnlocks.includes(time)) {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: null
    }).then(() => {
      message.channel.sendMessage('Lockdown lifted.');
      clearTimeout(client.lockit[message.channel.id]);
      delete client.lockit[message.channel.id];
    }).catch(error => {
      console.log(error);
    });
  } else {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: false
    }).then(() => {
      message.channel.sendMessage(`Channel locked down for ${ms(ms(time), { long:true })}`).then(() => {

        client.lockit[message.channel.id] = setTimeout(() => {
          message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: null
          }).then(message.channel.sendMessage('Lockdown lifted.')).catch(console.error);
          delete client.lockit[message.channel.id];
        }, ms(time));

      }).catch(error => {
        console.log(error);
      });
    });
  }
};
  }
    
});

client.login(process.env.TOKEN)
