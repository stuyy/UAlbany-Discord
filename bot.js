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
    var args = message.content.split(" ");
    console.log(args[1]);

    var args = message.content.split(" ");
    if(args[1] === 'cs')
    {
      findRole('Computer Science', message);
    }
  }

});

function findRole(roleName, message)
{
  var getRole = message.member.guild.roles.find('name', 'Computer Science');
  var roleID = getRole.id;

  message.member.addRole(roleID);
  console.log(message.content);
}
