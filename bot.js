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
    /*
    role = message.guild.roles.find('name', data.majorRole[0]);
    console.log("Searching if user has " + data.majorRole[0] + " role");
    if(message.member.roles.has(role.id))
    {
      console.log("hello");
      message.channel.send(message.author.username +  " has the " + data.majorRole[0] + " role!");
    }

    console.log("Size of array: " + data.majorRole.length);
    */
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
      }
      count++;
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
    }
  }

});

function findRole(roleName, message)
{
  var getRole = message.member.guild.roles.find('name', roleName);
  var roleID = getRole.id;

  message.member.addRole(roleID);
  console.log(message.content);
}
