
const Discord = require('discord.js');
const client = new Discord.Client();
const data = require("./dbot.json");

client.login(process.env.BOT_TOKEN);

client.on("ready", () => {

  console.log("Logged in successfully!");
  client.user.setActivity('with Federal Loans', {type: 'PLAYING'});

});

client.on('message', message => {

  if(message.content === 'bot help')
  {
    message.channel.send("`!addrole - Specify one or multiple keywords to be assigned to the respective role.\n!deleterole - Specify one or multiple keywords to be removed from the respective roles.\n!roles - list of all the roles\n!movein - Display information on move-in dates\n`");
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

    if(message.channel.name === "bot")
    {
      var args = message.content.split(" ");
      //var args = message.content.split(" ");
      if(args[1] === 'cs')
      {
        addUserRole('Computer Science', message);
      }
      else if(args[1] === 'bio')
      {
        addUserRole('Biology', message);

      }
      else if(args[1] === 'chem')
      {
        addUserRole('Chemistry', message);
      }
      else if(args[1] === 'phys')
        addUserRole('Physics', message);

      else if(args[1] === 'math')
        addUserRole('Mathematics', message);

      else {
        message.author.send("The role you specified does not exist or is a special role!");
      }
    }
    else
    {
      message.author.send("You must use this command in the #bot channel!");
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

      default:
      message.author.send("Please specify a role");
    }
  }

}); // End of message event.

function checkUserRoles(message)
{
  var count = 0;
  var majorArraySize = data.majorRole.length;
  while(count<majorArraySize)
  {
    // find the role first.
    role = message.guild.roles.find('name', data.majorRole[count]); // search each role
    console.log("Searching if user has " + data.majorRole[count] + " role");
    if(role === null)
    {
      count++;
      continue;
    }
    else if(message.member.roles.has(role.id))
    {
      message.channel.send(message.author.username + " has the " + data.majorRole[count] + " role!");
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
    message.author.send("Role assignment failed. The role does not exist or you tried to access a special role. Please contact the Administrator for additional info.");
    return;
  }
  // Check if the user is already assigned to the role.
  if(message.member.roles.has(role.id))
    message.author.send("You are already assigned to this role!");

  else {
    message.member.addRole(role.id);
    message.author.send("You've been assigned to the " + roleName + " role!");
    console.log("Role successfully added");
  }

}

function deleteUserRole(roleName, message)
{
  var role = message.member.guild.roles.find('name', roleName);
  if(role === null)
  {
    message.author.send("Role removal failed. You specified a role that you were not assigned to already, or doesn't exist. Please contact the Administrator for additional info.");
    return;
  }

  if(message.member.roles.has(role.id))
  {
    message.member.removeRole(role.id);
    message.author.send("You have successfully removed yourself from the " + roleName + " role!");
    console.log("Role removed successfully!");
  }
  else
  {
    message.member.author.send("You're trying to remove yourself from a role you are not assigned to.");
  }
}
