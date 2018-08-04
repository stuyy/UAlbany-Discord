const Discord = require('discord.js');
const client = new Discord.Client();
const botinfo = require("./botinfo.json");
const request = require('request');

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

  if(message.content === 'bot help')
  {
    message.channel.send("`!addrole - Specify one or multiple keywords to be assigned to the respective role.\n!deleterole - Specify one or multiple keywords to be removed from the respective roles.\n!roles - list of all the roles available\n!courseinfo - Enter the department/subject code/course number to retrieve a list of courses offered in Fall 2018 as an image.\n!weather - Provides the weather (only temperature as of now) of the city in Fahrenheight`");
  }

  else if(message.content === '!roles')
  {
    message.channel.send("`acc - Accounting\nact - Actuarial Science\nafs - Africana Studies\nart - Art\natm - Atmospheric Science\nbus - Business Administration\nce - Computer Engineering\ncrj - Criminal Justice\ncs - Computer Science\nbio - Biology\nchem - Chemistry\ncyb - Cybersecuritydig - Digital Forensics\neco - Economics\ngeo - geography\ninf - Informatics\nmath - Mathematics\nphys - Physics\npsy - Psychology\nfreshmen - Freshmen\nsophomore - Sophomore\njunior - Junior\nsenior - Senior\ntransfer - transfer\n\nGaming Roles: ow - Overwatch\nlol - League of Legends\n - fn - Fort Nite\n pubg - PUBG\n csgo - CSGO\nsiege - Rainbow Six Siege\n`");
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

  else if(message.content === '!destroy')
  {
    client.destroy();
  }

  else if(message.content === '!checkrole')
  {
    var status = checkUserRoles(message);
    if(status)
      console.log("User already has a role!");
    else {
      console.log("No role assigned!");
    }
  }

  else if(message.content.startsWith("!addrole"))
  {
    console.log("User trying to add themselves to a role.");

    if(message.channel.name === "bot2" || message.channel.name === "bot")
    {
      var args = message.content.split(" ");
      //var args = message.content.split(" ");
      var argLength = args.length;
      if(args>2) // If greater than 2, then the user is trying to add themselves to more than 1 role.
      {

      }
      if(args[1] === 'cs')
        addUserRole('Computer Science', message);

      else if(args[1] === 'bio')
        addUserRole('Biology', message);

      else if(args[1] === 'chem')
        addUserRole('Chemistry', message);

      else if(args[1] === 'phys')
        addUserRole('Physics', message);

      else if(args[1] === 'geo')
        addUserRole('Geography', message);

      else if(args[1] === 'math')
        addUserRole('Mathematics', message);

      else if(args[1] === 'act')
        addUserRole('Actuarial Science', message);

      else if(args[1] === 'afs')
        addUserRole('Africana Studies', message);

      else if(args[1] === 'atm')
        addUserRole('Atmospheric Science', message);

      else if(args[1] === 'acc')
        addUserRole('Accounting', message);

      else if(args[1] === 'dig')
        addUserRole('Digital Forensics', message);

      else if(args[1] === 'cyb')
        addUserRole('Cybersecurity', message);

      else if(args[1] === 'polsci')
        addUserRole('Political Science', message);

      else if(args[1] === 'art')
        addUserRole('Art', message);

      else if(args[1] === 'psy')
        addUserRole('Psychology', message);

      else if(args[1] === 'inf')
        addUserRole('Informatics', message);

      else if(args[1] === 'crj')
        addUserRole('Criminal Justice', message);

      else if(args[1] === 'bus')
        addUserRole('Business Administration', message);

      else if(args[1] === 'eco')
        addUserRole('Economics', message);

      else if(args[1] === 'ce')
        addUserRole('Computer Engineering', message);

      else if(args[1] === 'freshmen')
        addUserRole('Freshmen', message);

      else if(args[1] === 'sophomore')
        addUserRole('Sophomore', message);

      else if(args[1] === 'junior')
        addUserRole('Junior', message);

      else if(args[1] === 'senior')
        addUserRole('Senior', message);

      else if(args[1] === 'transfer')
        addUserRole('Transfer', message);

      else if(args[1] === 'greeklife')
        addUserRole('Greek Life', message);

      else if(args[1] === 'ow')
        addUserRole('Overwatch', message);

      else if(args[1] === 'lol')
        addUserRole('League of Legends', message);

      else if(args[1] === 'siege')
        addUserRole('Rainbow Six Siege', message);

      else if(args[1] === 'csgo')
        addUserRole('CSGO', message);

      else if(args[1] === 'pubg')
        addUserRole('PUBG', message);

      else if(args[1] === 'fn')
        addUserRole('Fort Nite', message);

      else {
        message.channel.send("The role you specified does not exist or is a special role! Sorry about that. :(");
      }
    }
    else
    {
      message.channel.send("You must use this command in the #bot channel!");
    }
  }

  else if(message.content.startsWith("!deleterole"))
  {
    console.log("User trying to delete themselves from a role.");
    var args = message.content.split(" ");
    switch(args[1])
    {
      case 'cs':
      deleteUserRole('Computer Science', message);
      break;

      case 'bio':
      deleteUserRole('Biology', message);
      break;

      case 'phys':
      deleteUserRole('Physics', message);
      break;

      case 'chem':
      deleteUserRole('Chemistry', message);
      break;

      case 'geo':
      deleteUserRole('Geography', message);
      break;

      case 'math':
      deleteUserRole('Mathematics', message);
      break;

      case 'art':
      deleteUserRole('Art', message);
      break;

      case 'crj':
      deleteUserRole('Criminal Justice', message);
      break;

      case 'eco':
      deleteUserRole('Economics', message);
      break;

      case 'bus':
      deleteUserRole('Business Administration', message);
      break;

      case 'ce':
      deleteUserRole('Computer Engineering', message);
      break;

      case 'act':
      deleteUserRole('Actuarial Science', message);
      break;

      case 'afs':
      deleteUserRole('Africana Studies', message);
      break;

      case 'atm':
      deleteUserRole('Atmospheric Science', message);
      break;

      case 'acc':
      deleteUserRole('Accounting', message);
      break;

      case 'dig':
      deleteUserRole('Digital Forensics', message);
      break;

      case 'cyb':
      deleteUserRole('Cybersecurity', message);
      break;

      case 'polsci':
      deleteUserRole('Political Science', message);
      break;

      case 'freshmen':
      deleteUserRole('Freshmen', message);
      break;

      case 'sophomore':
      deleteUserRole('Sophomore', message);
      break;

      case 'junior':
      deleteUserRole('Junior', message);
      break;

      case 'senior':
      deleteUserRole('Senior', message);
      break;

      case 'transfer':
      deleteUserRole('Transfer', message);
      break;

      case 'greeklife':
      deleteUserRole('Greek Life', message);
      break;

      case 'csgo':
      deleteUserRole('CSGO', message);
      break;

      case 'pubg':
      deleteUserRole('PUBG', message);
      break;

      case 'ow':
      deleteUserRole('Overwatch', message);
      break;

      case 'lol':
      deleteUserRole('League of Legends', message);
      break;

      case 'fn':
      deleteUserRole('Fort Nite', message);
      break;

      case 'siege':
      deleteUserRole('Rainbow Six Siege', message);
      break;

      default:
      message.channel.send("Please specify a role");
    }
  }

  else if(message.content.toLowerCase() === '!albany')
  {
    message.channel.send("Here's a picture of UAlabny's Football Field: ", {files: ['./ua.jpg']});
  }

}); // End of message event.

function isAdmin()
{

}
function checkUserRoles(message)
{
  var count = 0;
  var majorArraySize = botinfo.majorRole.length;
  while(count<majorArraySize)
  {
    // find the role first.
    role = message.guild.roles.find('name', botinfo.majorRole[count]); // search each role
    console.log("Searching if user has " + botinfo.majorRole[count] + " role");
    if(role === null)
    {
      count++;
      continue;
    }
    else if(message.member.roles.has(role.id))
    {
      message.channel.send(message.author.username + " has the " + botinfo.majorRole[count] + " role!");
      return true;
    }
    count++;
  }

  return false;

}

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
        msg.channel.send("The current temperature in " + city + " is " + Math.ceil(temp) + " degrees F.");
      }
  })
}
