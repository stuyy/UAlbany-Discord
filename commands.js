const roles = require('./roles.json');
const Discord = require('discord.js');

exports.help = function help(message, botinfo)
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
exports.addRole = function addRole(message)
{
  console.log("User trying to add themselves to a role.");
  let args = message.content.toLowerCase().split(" ");
  let addedRoles = [];
  let notAddedRoles = [];
  if(args.length > 1) // User specified at least one role (2 args).
  {
    let i = 1;
    while(i<args.length)
    {
      if(roles.hasOwnProperty(args[i]))
      {
        console.log(roles[args[i]]);
        var role = message.guild.roles.find(role => role.name === roles[args[i]]); // Passing in a function instead of a property.
        if(!(message.member.roles.has(role.id)))
        {
          addedRoles.push(role);
          message.member.addRole(role.id);
        }
        else
          notAddedRoles.push(role);
      }
      i++;
    }
  }
  displayResult(addedRoles, notAddedRoles, message);
}

exports.deleteRole = function deleteRole(message)
{
  console.log("User trying to delete themselves from role.");
  let args = message.content.toLowerCase().split(" ");
  let deleteRoles = [];
  let notDeletedRoles = [];
  if(args.length > 1)
  {
    let i = 1;
    while(i<args.length)
    {
      if(roles.hasOwnProperty(args[i]))
      {
        var role = message.guild.roles.find('name', roles[args[i]]);
        if(message.member.roles.has(role.id))
          message.member.removeRole(role.id).then(console.log("Success")).catch("Error in removing role");
      }
      i++;
    }
  }
}

exports.displayRoles = function displayRoles(message, botinfo)
{
  const embed = new Discord.RichEmbed()
  .setTitle("UAlbany Discord Server Roles")
  .setColor(0x9829e8)
  .setDescription("To add yourself to a role, simply type !addrole [ all of the role keywords go here without the square brackets], i.e: !addrole cs math phys")
  .addField("List of Major-Specific Roles", botinfo.roleList)
  .addField("List of roles specified by Academic Standing", botinfo.yearRoles)
  .addField("List of Gaming Roles", botinfo.gamingRoles);
  message.channel.send(embed);
}

function displayResult(added, notAdded, message)
{
  if(added.length > 0 && notAdded.length == 0) // User specified a role they are not in; did not specify a role they are already in.
  {
    const embed = new Discord.RichEmbed()
    .setAuthor("Updated Roles for " + message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL)
    .setDescription("Added to: " + added.join(", ") +"\nNot Added to: " + notAdded.join(", "));
    message.channel.send(embed);

  }
  else if(added.length > 0 && notAdded.length > 0) // User specified roles they were not in, and roles they were already in.
  {
    const embed = new Discord.RichEmbed()
    .setAuthor("Updated Roles for " + message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL)
    .setDescription("Added to: " + added.join(", ") +"\nNot Added to: " + notAdded.join(", "));
    message.channel.send(embed);
  }
  else if(added.length == 0 && notAdded.length > 0) // User only specified roles they were already added to previously, and did not try to add themselves to a new role.
  {
    const embed = new Discord.RichEmbed()
    .setAuthor("Updated Roles for " + message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL)
    .setDescription("Added to: " + added.join(", ") +"\nNot Added to: " + notAdded.join(", "));
    message.channel.send(embed);
  }
  else if(added.length == 0 && notAdded.length == 0)
  {
    const embed = new Discord.RichEmbed()
    .setDescription("Please specify a role.");
    message.channel.send(embed);
  }
}
exports.checkPermission = function checkPermission(message)
{
  return message.channel.name === 'bot' || message.member.hasPermission('ADMINISTRATOR');
}
exports.checkCommand = function checkCommand(message, commandName)
{
  return message.content.toLowerCase().startsWith("!" + commandName);
}
