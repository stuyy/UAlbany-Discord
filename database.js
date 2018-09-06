const mysql = require('mysql');
const config = require('./config.json');
var con = mysql.createConnection(config.info);
con.connect(function(err) {
  if(err) throw err;
  console.log("Connected Successfully!");
});

exports.showTable = function showTable(message)
{
  if(message.member.hasPermission('ADMINISTRATOR'))
  {
    console.log("User is an admin!");
    con.query("SELECT * FROM level", (err, result) => {
      if(err) throw err;
      console.log(result);
    });
  }
  else
    console.log("A non-admin is trying to access this command");

}

exports.viewXP = function viewXP(message)
{
  con.query(`SELECT * FROM level WHERE id = ${message.author.id}`, (err, result) => {
    if(err) throw err;
    console.log(message.author + " has " + result[0].xp + " total xp");
    message.channel.send("Your total experience is: " + result[0].xp);
  });
}

exports.addXP = function addXP(message)
{
  if(message.content.startsWith("`")) return;
  con.query(`SELECT * FROM level WHERE id = ${message.author.id}`, (err, rows) => {
    if(err) throw err;
    if(rows.length < 1)
    {
      let sql = `INSERT INTO level (id, xp) VALUES ('${message.author.id}', ${xpGenerate(message)})`;
      con.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
      });
    }
    else
    {
      let xp = rows[0].xp;
      let sql = `UPDATE level SET xp = ${xp + xpGenerate(message)} WHERE id = '${message.author.id}'`;
      con.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
      });
    }

    con.query(`SELECT * FROM level WHERE id = '${message.author.id}'`, function (err, result, fields) {
      if (err) throw err;
      console.log(result[0].xp);
      if(result[0].xp >= 120 && result[0].xp < 240)
      {
        var role = message.guild.roles.find(roles => roles.name === 'Rank One');
        if(message.member.roles.has(role.id))
        {
          console.log("User already leveled up.");
        }
        else
        {
          message.channel.send(message.author + " leveled up! You have reached level 1");
          message.member.addRole(role.id);
        }
      }
      else if(result[0].xp >= 240 && result[0].xp < 480)
      {
        var role = message.guild.roles.find(roles => roles.name === 'Rank Two');
        var previousRole = message.guild.roles.find(roles => roles.name === 'Rank One');
        if(message.member.roles.has(previousRole.id))
        {
          console.log("Removing user from rank 1 role");
          message.member.removeRole(previousRole.id);
        }
        if(message.member.roles.has(role.id))
          console.log("User already leveled up.");
        else
        {
          message.channel.send(message.author + " leveled up! You have reached level 2");
          message.member.addRole(role.id);
        }

      }
      else if(result[0].xp >= 480 && result[0].xp < 1024)
      {
        var role = message.guild.roles.find(roles => roles.name === 'Rank Three');
        var previousRole = message.guild.roles.find(roles => roles.name === 'Rank Two');
        if(message.member.roles.has(previousRole.id))
        {
          console.log("Removing user from rank 2 role");
          message.member.removeRole(previousRole.id);
        }
        if(message.member.roles.has(role.id))
          console.log("User already leveled up.");
        else
        {
          message.channel.send(message.author + " leveled up! You have reached level 3");
          message.member.addRole(role.id);
        }
      }
      else if(result[0].xp >= 1024 && result[0].xp < 2048)
      {
        var role = message.guild.roles.find(roles => roles.name === 'Rank Four');
        var previousRole = message.guild.roles.find(roles => roles.name === 'Rank Three');
        if(message.member.roles.has(previousRole.id))
        {
          console.log("Removing user from rank 3 role");
          message.member.removeRole(previousRole.id);
        }
        if(message.member.roles.has(role.id))
          console.log("User already leveled up.");
        else
        {
          message.channel.send(message.author + " leveled up! You have reached level 4");
          message.member.addRole(role.id);
        }
      }
  });
});
}

function xpGenerate(msg)
{
  var size = msg.content.length;
  return size/5;
}
