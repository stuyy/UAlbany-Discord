const data = require("./dbot.json");
const Discord = require("discord.js");
const client = new Discord.Client();

client.login(data.token);

client.on("ready", () => {

  console.log("Hello");

});

client.on('message', message => {

  if(message.content === 'hello')
  {
    message.reply('Welcome!');
  }

  if(message.content === '!checkrole')
  {
    var status = checkUserRoles(message);
    if(status)
      console.log("User already has a role!");
    else {
      console.log("No role assigned!");
    }
  }
  if(message.content === '!csrole')
  {
    var getRole = message.member.guild.roles.find('name', 'Computer Science');
    var csRoleID = getRole.id;

    console.log(csRoleID);

    message.member.addRole(csRoleID);

  }

  if(message.content.startsWith("!addrole"))
  {
    console.log("User trying to add themselves to a role.");

    if(message.channel.name === "bot")
    {
      var args = message.content.split(" ");
      console.log(args[1]);

      var args = message.content.split(" ");
      if(args[1] === 'cs')
      {
        findRole('Computer Science', message);

      }
      else if(args[1] === 'bio')
      {
        findRole('Biology', message);
        message.author.send("You've been assigned to the Biology role!");
      }
    }
    else
    {
      message.author.send("You must use this command in the #bot channel!");
    }
  }

});

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

function findRole(roleName, message)
{
  var getRole = message.member.guild.roles.find('name', roleName);
  var roleID = getRole.id;
  // First check if the user is already part of this role.

  if(message.member.roles.has(roleID))
    message.author.send("You are already assigned to this role!");

  else {
    message.member.addRole(roleID);
    message.author.send("You've been assigned to the " + roleName + " role!");
    console.log("Role successfully added");
  }

}
