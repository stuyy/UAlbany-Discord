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
  let greatDane = member.guild.roles.find('name', 'Great Dane');
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

client.on('message', message => {

  if(message.author.bot) return;
  if(message.content.toLowerCase() === '!help' && (message.channel.name === 'bot' || message.member.hasPermission('ADMINISTRATOR')))
  {
    const embed = new Discord.RichEmbed()
    .setTitle("List of all the commands for Dane BOT")
    .setColor(0xbca72d)
    .addField(botinfo.commands[0].commandName, botinfo.commands[0].description)
    .addField(botinfo.commands[1].commandName, botinfo.commands[1].description)
    .addField(botinfo.commands[2].commandName, botinfo.commands[2].description)
    .addField(botinfo.commands[3].commandName, botinfo.commands[3].description)
    .addField(botinfo.commands[4].commandName, botinfo.commands[4].description)
    .addField(botinfo.commands[5].commandName, botinfo.commands[5].description);
    message.channel.send({embed});
  }
  else if(message.content.toLowerCase() === '!roles' && message.channel.name === 'bot')
  {
    const embed = new Discord.RichEmbed()
    .setTitle("UAlbany Discord Server Roles")
    .setColor(0x9829e8)
    .setDescription("To add yourself to a role, simply type !addrole [ all of the role keywords go here without the square brackets], i.e: !addrole cs math phys")
    .addField("List of Major-Specific Roles", botinfo.roleList)
    .addField("List of roles specified by Academic Standing", botinfo.yearRoles)
    .addField("List of Gaming Roles", botinfo.gamingRoles);
    message.channel.send({embed});

  }
  else if(message.content.toLowerCase().startsWith("!weather") && (message.channel.name === 'bot' || message.member.hasPermission('ADMINISTRATOR')))
    weather.getWeather(message);

  else if(message.content.toLowerCase().startsWith("!addrole"))
  {
    if(message.channel.name === "bot" || message.member.hasPermission('ADMINISTRATOR'))
      commands.addRole(message);
    else
      message.channel.send("You must use this command in the #bot channel!");
  }
  else if(message.content.toLowerCase().startsWith("!deleterole"))
  {
    if(message.channel.name === "bot2" || message.channel.name === "bot")
      commands.deleteRole(message);
    else
      message.channel.send("You must use this command in the #bot channel!");
  }

  else if(message.content.startsWith("!maps"))
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
  else if(message.content.toLowerCase() === '!viewxp' && (message.channel.name === 'bot' ||  message.member.hasPermission('ADMINISTRATOR')))
    database.viewXP(message);

  else if(message.content.toLowerCase() === '!rankings' && (message.channel.name === 'bot' || message.member.hasPermission('ADMINISTRATOR')))
    database.sortTable(message);

  else if(message.content.toLowerCase().includes('nigga') || message.content.toLowerCase().includes('fag') || message.content.toLowerCase().includes('nigger'))
  {
    message.delete().then(msg => console.log('Deleted message from ${msg.author.username}'))
    .catch(console.error);
  }


  /*
  else if(message.content.toLowerCase() === '!create')
    database.createTable();

  else if(message.content.toLowerCase() === '!drop')
    database.drop();
    */

  else if(message.content.toLowerCase() === '!cleardata')
  {
    if(message.member.hasPermission('ADMINISTRATOR'))
      database.clearData(message);
  }
  else if(message.content.toLowerCase() === '!fetch')
  {
    client.fetchUser('396345752458100748').then(user => console.log(user.username));
  }
  else
  {
      database.addXP(message);
      /*
      botinfo.phrases.some(v =>
        {
          if(message.content.toLowerCase().includes(v.statement))
          {
            var num = Math.floor(Math.random() * v.reply.length);
            message.channel.send(message.author + ' ' + v.reply[num]);
          }
        });*/
  }


}); // End of message event.
