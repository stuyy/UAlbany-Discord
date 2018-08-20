const Discord = require('discord.js');
const client = new Discord.Client();
const commands = require('./commands.js');
const botinfo = require('./botinfo.json');
const weather = require('./weather.js');
const maps = require('./uainfo.js');

client.login(process.env.BOT_TOKEN);

client.on("ready", () => {

  console.log("Logged in successfully!");
  client.user.setActivity('with Federal Loans | "!help" for more info', {type: 'PLAYING'});

});

client.on('guildMemberAdd', member => {

  var generalChannel = client.channels.find('name', 'general');
  console.log(member.user.username);
  console.log(generalChannel.name);
  let greatDane = member.guild.roles.find('name', 'Great Dane');
  generalChannel.send("Welcome to the server " + member.user + "!");
  member.addRole(greatDane.id);
});

client.on('message', message => {

  if(message.content === '!help')
    message.channel.send(botinfo.commandList);

  else if(message.content === '!roles')
    message.channel.send(botinfo.roleList);

  else if(message.content.toLowerCase().startsWith("!weather"))
    weather.getWeather(message);

  else if(message.content.startsWith("!addrole"))
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
    maps.showMap(message);
  }
  /*
  else if (message.channel.name === 'giphy-posts')
  {
    giphy.sendGIF(message, message.content.toLowerCase());
  }
  */

}); // End of message event.
