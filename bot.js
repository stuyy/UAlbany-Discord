const Discord = require('discord.js');
const client = new Discord.Client();
const commands = require('./commands.js');
const botinfo = require('./botinfo.json');
const weather = require('./weather.js');

client.login(process.env.BOT_TOKEN);

client.on("ready", () => {

  console.log("Logged in successfully!");
  client.user.setActivity('with Federal Loans | "!help" for more info', {type: 'PLAYING'});

});

client.on('guildMemberAdd', member => {

  var generalChannel = client.channels.find('name', 'general');
  console.log(member.user.username);
  console.log(generalChannel.name);
  console.log("Welcome " + member.user.username + "! Be sure to check out the rules and information channel!");
  let greatDane = member.guild.roles.find('name', 'Great Dane');
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

}); // End of message event.
