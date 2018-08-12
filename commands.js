const roles = require('./roles.json');

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
        var role = message.guild.roles.find('name', roles[args[i]]);
        if(!(message.member.roles.has(role.id)))
        {
          addedRoles.push(roles[args[i]]);
          message.member.addRole(role.id);
        }
        else
          notAddedRoles.push(roles[args[i]]);
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

function displayResult(added, notAdded, message)
{
  if(added.length > 0)
    message.channel.send(message.author + " has been added to the following role(s): " + added.join(", "));
  if(notAdded.length > 0)
    message.channel.send(message.author + " was not added to the following role(s): " + notAdded.join(", ") + ". Either the roles you listed do not exist, were applied to you already, or you do not have permission.");
}
