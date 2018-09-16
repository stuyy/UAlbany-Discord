const Discord = require('discord.js');
const client = new Discord.Client();
const commands = require('./commands.js');
const botinfo = require('./botinfo.json');
const config = require('./config.json');
const weather = require('./weather.js');
const info = require('./uainfo.js');
const database = require('./database.js');
const imgur = require('./imgur.js');
const recentUser = new Set();

client.login(config.token);

client.on("ready", () => {

  console.log("Logged in successfully!");
  client.user.setActivity('with Federal Loans | "!help" for more info', {type: 'PLAYING'});

});

client.on('guildUpdate', (oldGuild, newGuild) => {
  newGuild.fetchAuditLogs().then(audit => console.log(audit.Actions)).catch(console.error);
});

client.on('guildMemberAdd', member => {

  var welcomeChannel = client.channels.find(c => c.name === 'welcome');
  var intro = client.channels.find(channel => channel.name === 'introductions');
  var botChannel = client.channels.find(channel => channel.name === 'bot');
  let greatDane = member.guild.roles.find(role => role.name === 'Great Dane');
  welcomeChannel.send("Welcome to the server " + member.user + "! Feel free to introduce yourself over on" + intro + " and add yourself to a role on the " + botChannel + " channel!");
  member.addRole(greatDane.id);
  database.modifyDB(true, member);
  var logChannel = client.channels.find(channel => channel.id === '489191706819035154');
  if(logChannel != null)
  {
    let name = member.user.username;
    let memberID = member.id;
    let tag = member.user.discriminator;
    let authorName = name + "#" + tag + " (" + memberID + ")";
    const embed = new Discord.RichEmbed()
    .setAuthor(authorName, member.user.displayAvatarURL)
    .setFooter("User joined")
    .setColor("#41a9f4");
    logChannel.send({embed});
  }
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
    let msgCount = message.content.split(" ").join("").length;
    let randomPercentage = Math.random()/5;
    let xpToRemove = Math.ceil(randomPercentage * msgCount) + Math.ceil(msgCount/6);
    console.log("The percentage is " + randomPercentage.toFixed(2));
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
  else if ((message.channel.name === 'imgur-posts'))
  {
    if(recentUser.has(message.author.id))
      message.channel.send("Please wait 15 seconds before typing this again " + message.author);
    else
    {
      imgur.search(message, message.content.toLowerCase());
      recentUser.add(message.author.id);
      setTimeout(()=>{
        recentUser.delete(message.author.id);
      }, 15000);
    }
  }
  else if(message.content.toLowerCase() === '!viewtable' && message.member.hasPermission('ADMINISTRATOR'))
    database.showTable(message);
  else if(message.content.toLowerCase() === '!rankings' && (message.channel.name === 'bot' || message.member.hasPermission('ADMINISTRATOR')))
    database.sortTable(message);
  else if(message.content.toLowerCase() === '!viewxp' && (message.channel.name === 'bot' ||  message.member.hasPermission('ADMINISTRATOR')))
    database.checkLevel(message);
  else if(message.content.toLowerCase().includes('nigga') || message.content.toLowerCase().includes('fag') || message.content.toLowerCase().includes('nigger') || message.content.toLowerCase().includes('niqqa') || message.content.toLowerCase().includes('nigguh'))
  {
    message.delete().then(msg => console.log('Deleted message from ${msg.author.username}'))
    .catch(console.error);
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
    info.showInvite(message);
  else if(message.content.toLowerCase() === '!create')
    database.createTable();
  else if(message.content.toLowerCase() === '!drop')
    database.drop();
  else if(message.content.toLowerCase() === '!cleardata')
  {
    if(message.member.hasPermission('ADMINISTRATOR'))
      database.clearData(message);
  }*/
  else
    database.addXP(message);
}); // End of message event.
