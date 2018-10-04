const Discord = require('discord.js');
const client = new Discord.Client();
const commands = require('./commands.js');
const botinfo = require('./botinfo.json');
const config = require('./config.json');
const weather = require('./weather.js');
const info = require('./uainfo.js');
const database = require('./database.js');
const ytdl = require('ytdl-core');
const trivia = require('./trivia-games/trivia.js');
var isReady = true;
client.login(config.token);

client.on("ready", () => {

  console.log("Logged in successfully!");
  client.user.setActivity('with Federal Loans | "!help" for more info', {type: 'PLAYING'});

});
client.on('guildMemberAdd', member => {
    commands.newUserAdd(client, member, database);
});

client.on('guildMemberRemove', member => {
  database.modifyDB(false, member); // remove the member from the database.
  var logChannel = client.channels.find(channel => channel.id === '489191706819035154');
  if(logChannel != null)
  {
    let name = member.user.username;
    let memberID = member.id;
    let tag = member.user.discriminator;
    let authorName = name + "#" + tag + " (" + memberID + ")";
    const embed = new Discord.RichEmbed()
    .setAuthor(authorName, member.user.displayAvatarURL)
    .setFooter("User left")
    .setColor("#f44141");
    logChannel.send({embed});
  }
});


client.on('messageDelete', message => {

  let userMember = message.guild.members.find(member => member.id === message.member.id);
  if(userMember === null || message.content.startsWith("!") || message.content.startsWith("`") || message.author.bot)
    console.log("User not found, message author was a BOT, or message deleted did not acquire XP to begin with.");
  else
  {
    let content = message.content;
    let authorUser = message.author;
    let msgCount = message.content.length;
    let xpToRemove = msgCount;
    database.deleteXP(message.member.id, xpToRemove);
  }
});

client.on('message', message => {

  if(message.author.bot) return;
  if(message.channel.type === 'dm')
  {
    if(message.content.toLowerCase().startsWith("!announce") && message.author.id === '187090775819943936')
    {
      let args = message.content.toLowerCase().split(" ");
      args.length = 2; // Get the command AND the channel.
      let channelName = args[1];
      console.log(channelName);
      console.log(channelName.length);
      let announcement = message.content.substr(message.content.indexOf(' ') + channelName.length+1);
      let guild = client.guilds.find(guild => guild.id === '298219088356966402');
      try {
        let author = "Message from: " + message.author.username;
        let someChannel = guild.channels.find(c => c.name === channelName);
        let embed = new Discord.RichEmbed()
        .setTitle("")
        .setAuthor(client.user.username, client.user.displayAvatarURL)
        .setDescription(announcement);
        someChannel.send({embed});
      }
      catch(err)
      {
        console.log(err);
      }
    }
    else
    {
      message.channel.send("You are not authorized to use this command");
    }
  }
  if(commands.checkCommand(message, "help") && commands.checkPermission(message))
    commands.help(message, botinfo);
  else if(commands.checkCommand(message, "roles") && commands.checkPermission(message))
    commands.displayRoles(message, botinfo);
  else if(commands.checkCommand(message, "weather") && commands.checkPermission(message))
    weather.getWeather(message);
  else if(commands.checkCommand(message, "addrole") && commands.checkPermission(message))
    commands.addRole(message);
  else if(commands.checkCommand(message, "deleterole") && commands.checkPermission(message))
    commands.deleteRole(message);
  else if(commands.checkCommand(message, "maps"))
    info.showMap(message);
  else if(message.content.toLowerCase().startsWith("!hours"))
    info.showHours(message);
  else if(message.content.toLowerCase() === '!viewtable' && message.member.hasPermission('ADMINISTRATOR'))
    database.showTable(message);
  else if(message.content.toLowerCase() === '!rankings' && (message.channel.name === 'bot' || message.member.hasPermission('ADMINISTRATOR')))
    database.sortTable(message);
  else if(message.content.toLowerCase() === '!viewxp' && (message.channel.name === 'bot' ||  message.member.hasPermission('ADMINISTRATOR') || message.member.hasPermission('MANAGE_MESSAGES')))
    database.getUserData(message);
  else if(commands.checkCommand(message, "viewuser"))
    commands.viewUserData(message);
  else if(commands.checkCommand(message, "trivia"))
  {
    trivia.displayQuestion(message);
  }
  else if(commands.checkCommand(message, "play") && (message.channel.name === 'music' || message.member.hasPermission('ADMINISTRATOR')))
  {
    console.log("Current Status: " + isReady);
    var args = message.content.split(" ");
    let voice = client.channels.find(c => c.id === '497242812933472278');
    let url = args[1];
    console.log(url);
    const stream = ytdl(url, { filter : 'audioonly' });
    if(isReady)
    {
      isReady = false;
      voice.join()
      .then(connection => {
        const stream = ytdl(url, {filter : 'audioonly'});
        const dispatcher = connection.playStream(stream, { seek: 0, volume: 1});
        dispatcher.on('end', err => {
          console.log("End");
          voice.leave();
          isReady = true;
          console.log("Status: " + isReady);
        });
      }).catch(err =>console.log(err));
    }

  }
  else if(commands.checkCommand(message, "leave"))
  {
      let voice = client.channels.find(c => c.id === '497242812933472278');
      voice.leave();
  }
  /*
  else if(message.content.toLowerCase() === '!showintro')
    info.showIntro(message);
  else if(message.content.toLowerCase() === '!rules')
    info.showRules(message);
  else if(message.content.toLowerCase() === '!roleinfo')
    info.showRoleInfo(message);
  else if(message.content.toLowerCase() === '!chinfo')
    info.showChannelInfo(message);
  else if(message.content.toLowerCase() === '!footer')
    info.showFooter(message);
  else if(message.content.toLowerCase() === '!invite')
    info.showInvite(message);*/
  else
    database.addXP(message);
}); // End of message event.
