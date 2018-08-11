const roles = require('./roles.json');

function addRole(message)
{
  console.log("User trying to add themselves to a role.");
  let args = message.content.toLowerCase().split(" ");
  let addedRoles, notAddedRoles = [];
  if(args.length > 1) // User specified at least one role (2 args).
  {
    let i = 1;
    while(i<args.length)
    {
      if(roles.hasOwnProperty(args[i]))
      {
        let role = message.guild.roles.find('name', roles[args[i]]);
        addedRoles.push(roles[args[i]]);
        message.member.addRole(role.id);
      }
      else
        notAddedRoles.push(roles[args[i]]);
    }
    i++;
  }
}

function deleteRole()
{

}
