const Discord = require('discord.js');
const client = new Discord.Client();
const botinfo = require("./botinfo.json");
const request = require('request');
const commands = require('./commands.js');

client.login(process.env.BOT_TOKEN);

client.on("ready", () => {

  console.log("Logged in successfully!");
  client.user.setActivity('with Federal Loans | "bot help" for more info', {type: 'PLAYING'});

});

client.on('guildMemberAdd', member => {

  var generalChannel = client.channels.find('name', 'general');
  console.log(member.user.username);
  console.log(generalChannel.name);

  console.log("Welcome " + member.user.username + "! Be sure to check out the rules and information channel!")

});

client.on('message', message => {

  if(message.content === '!help')
  {
    message.channel.send("`!addrole - Specify one or multiple keywords to be assigned to the respective role.\n!deleterole - Specify one or multiple keywords to be removed from the respective roles.\n!roles - list of all the roles available\n!courseinfo - Enter the department/subject code/course number to retrieve a list of courses offered in Fall 2018 as an image.\n!weather - Provides the weather (only temperature as of now) of the city in Fahrenheight`");
  }

  else if(message.content === '!roles')
  {
    message.channel.send("`acc - Accounting\nact - Actuarial Science\nafs - Africana Studies\nart - Art\natm - Atmospheric Science\nbus - Business Administration\nce - Computer Engineering\ncrj - Criminal Justice\ncs - Computer Science\nbio - Biology\nchem - Chemistry\ncyb - Cybersecuritydig - Digital Forensics\neco - Economics\ngeo - geography\ninf - Informatics\nmath - Mathematics\nphys - Physics\npsy - Psychology\nfreshmen - Freshmen\nsophomore - Sophomore\njunior - Junior\nsenior - Senior\ntransfer - transfer\n\nGaming Roles:\now - Overwatch\nlol - League of Legends\nfn - Fort Nite\npubg - PUBG\ncsgo - CSGO\nsiege - Rainbow Six Siege\n`");
  }

  else if(message.content === '!weather')
  {
    message.channel.send("What is your city?");
    const filter = m => (!m.author.bot);
    message.channel.awaitMessages(filter, {max: 1, time: 0, errors: ['time'] })
    .then(collected => {
      cityName = collected.first().content;
      var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=b72c192b44cefcc6c901db99aaa5823e';
      getTemp(message, url, cityName);
    })
    .catch(collected => console.log("Error"));
  }

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

function addUserRole(roleName, message)
{
  var role = message.member.guild.roles.find('name', roleName);

  if(role === null) // Check if the user entry is legal.
  {
    message.channel.send("Role assignment failed. The role does not exist or you tried to access a special role. Please contact the Administrator for additional info.");
    return;
  }
  // Check if the user is already assigned to the role.
  if(message.member.roles.has(role.id))
    message.channel.send("You are already assigned to this role!");

  else {
    message.member.addRole(role.id);
    message.channel.send("You've been assigned to the " + roleName + " role!");
    console.log("Role successfully added");
  }

}

function deleteUserRole(roleName, message)
{
  var role = message.member.guild.roles.find('name', roleName);
  if(role === null)
  {
    message.channel.send("Role removal failed. You specified a role that you were not assigned to already, or doesn't exist. Please contact the Administrator for additional info.");
    return;
  }

  if(message.member.roles.has(role.id))
  {
    message.member.removeRole(role.id);
    message.channel.send("You have successfully removed yourself from the " + roleName + " role!");
    console.log("Role removed successfully!");
  }
  else
  {
    message.channel.send("You're trying to remove yourself from a role you are not assigned to.");
  }
}

function kelToF(temp)
{
  return (temp*(9/5)) - 459.67;
}

function getTemp(msg, url, city)
{
  request(url, function(err, res, body) {
    var data = JSON.parse(body);
    if(data.cod === "404")
      msg.channel.send("Invalid city provided, try again.");

      else {
        var temp = kelToF(data.main.temp);
        var condition = data.weather[0].main;
        msg.channel.send("The current temperature in " + city + " is " + Math.ceil(temp) + " degrees F. Weather condition: " + condition);
      }
  })
}
