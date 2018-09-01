const Discord = require('discord.js');
const client = new Discord.Client();
const commands = require('./commands.js');
const botinfo = require('./botinfo.json');
const weather = require('./weather.js');
const info = require('./uainfo.js');
const giphy = require('./giphy.js');
const recentUser = new Set();

client.login(process.env.BOT_TOKEN);

client.on("ready", () => {

  console.log("Logged in successfully!");
  client.user.setActivity('with Federal Loans | "!help" for more info', {type: 'PLAYING'});

});

client.on('guildMemberAdd', member => {

  var generalChannel = client.channels.find('name', 'general');
  console.log(member.user.username);
  console.log(generalChannel.name);
  var intro = client.channels.find(channel => channel.name === 'introductions');
  var botChannel = client.channels.find(channel => channel.name === 'bot');
  let greatDane = member.guild.roles.find('name', 'Great Dane');
  generalChannel.send("Welcome to the server " + member.user + "! Feel free to introduce yourself over on" + intro + " and add yourself to a role on the " + botChannel + " channel!");
  member.addRole(greatDane.id);
});

client.on('message', message => {

  if(message.content === '!help')
  {
    const embed = new Discord.RichEmbed()
    .setTitle("List of all the commands for Dane BOT")
    .setColor(0xbca72d)
    .addField("Commands", botinfo.commandList);
    message.channel.send({embed});
  }


  else if(message.content === '!roles')
    //message.channel.send(botinfo.roleList);
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
  else if(message.content.toLowerCase().startsWith("!weather"))
    weather.getWeather(message);

  else if(message.content.toLowerCase().startsWith("!addrole"))
  {
    if(message.channel.name === "bot2" || message.channel.name === "bot")
      commands.addRole(message);
    else
      message.channel.send("You must use this command in the #bot channel!");
  }
  else if(message.content.startsWith("!deleterole"))
  {
    if(message.channel.name === "bot2" || message.channel.name === "bot")
      commands.deleteRole(message);
    else
      message.channel.send("You must use this command in the #bot channel!");
  }

  else if(message.content.startsWith("!maps"))
  {
    info.showMap(message);
  }
  else if(message.content.toLowerCase().startsWith("!hours"))
  {
    info.showHours(message);
  }
  else if ((message.channel.name === 'giphy-posts') && !message.author.bot)
  {
    if(recentUser.has(message.author.id))
      message.channel.send("Please wait 10 seconds before typing this again " + message.author);

    else
    {
      if(!message.author.bot)
        giphy.sendGIF(message, message.content.toLowerCase());

      recentUser.add(message.author.id);
      setTimeout(()=>{
        recentUser.delete(message.author.id);
      }, 10000);
    }

  }
  else if(botinfo.phrases.some(v => v.statement === message.content.toLowerCase())) // If true
  {
    console.log("Check");
  }



}); // End of message event.
