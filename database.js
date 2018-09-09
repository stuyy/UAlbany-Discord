const mysql = require('mysql');
const config = require('./config.json');
const Discord = require('discord.js');
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

exports.createTable = function createTable()
{
  con.query('CREATE TABLE level (id VARCHAR(100), xp MEDIUMINT)', err => {
    if(err) throw err;
    console.log("Table created Successfully");
  });
}

exports.viewXP = function viewXP(message)
{
  con.query(`SELECT * FROM level WHERE id = ${message.author.id}`, (err, result) => {
    if(err) throw err;
    console.log(message.author + " has " + result[0].xp + " total xp");
    const embed = new Discord.RichEmbed()
    .setTitle(message.author.username + "'s total XP")
    .setColor("#42dcf4")
    .addField("Total XP: ", result[0].xp);
    message.channel.send({embed});
  });
}

exports.clearData = function clearData(message)
{
  con.query(`DELETE FROM level WHERE id = ${message.author.id}`, err => {
    if(err) throw err;
    console.log("Cleared data.");
  });
}

exports.drop = function drop()
{
  con.query("DROP TABLE level", err => {
    if(err) throw err;
    console.log("Removed table successfully");
  })
}
exports.addXP = function addXP(message)
{
  if(message.content.startsWith("`") || message.content.startsWith("!")) return;
  con.query(`SELECT * FROM level WHERE id = ${message.author.id}`, (err, rows) => {
    if(err) throw err;
    if(rows.length < 1)
    {
      let sql = `INSERT INTO level (id, xp) VALUES ('${message.author.id}', ${xpGenerate()})`;
      con.query(sql, (err, result) => {
        if(err) throw err;
        console.log("Successfully updated XP for " + message.author.username);
      });
    }
    else
    {
      let xp = rows[0].xp;
      let sql = `UPDATE level SET xp = ${xp + xpGenerate()} WHERE id = '${message.author.id}'`;
      con.query(sql, (err, result) => {
        if(err) throw err;
        console.log("Successfully updated XP for " + message.author.username);
      });
    }

    con.query(`SELECT * FROM level WHERE id = '${message.author.id}'`, function (err, result, fields) {
      if (err) throw err;
      console.log(result[0].xp);
      if(result[0].xp >= 120 && result[0].xp < 240)
      {
        var role = message.guild.roles.find(roles => roles.name === 'Rank One');
        if(message.member.roles.has(role.id))
          console.log("User already leveled up.");

        else
        {
          var expChannel = message.guild.channels.find(c => c.name === 'xp-levels');
          var botChannel = message.guild.channels.find(c => c.name === 'bot');
          const embed = new Discord.RichEmbed()
          .setTitle("Level Up!")
          .setDescription(message.author + " has just reached level 1. To view your total XP, type !viewxp in the " + botChannel + " channel!")
          .setColor("#42f46e");
          expChannel.send({embed});
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
          var expChannel = message.guild.channels.find(c => c.name === 'xp-levels');
          var botChannel = message.guild.channels.find(c => c.name === 'bot');
          const embed = new Discord.RichEmbed()
          .setTitle("Level Up!")
          .setDescription(message.author + " has just reached level 2. To view your total XP, type !viewxp in the " + botChannel + " channel!")
          .setColor("#42f46e");
          expChannel.send({embed});
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
          var expChannel = message.guild.channels.find(c => c.name === 'xp-levels');
          var botChannel = message.guild.channels.find(c => c.name === 'bot');
          const embed = new Discord.RichEmbed()
          .setTitle("Level Up!")
          .setDescription(message.author + " has just reached level 3. To view your total XP, type !viewxp in the " + botChannel + " channel!")
          .setColor("#42f46e");
          expChannel.send({embed});
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
          var expChannel = message.guild.channels.find(c => c.name === 'xp-levels');
          var botChannel = message.guild.channels.find(c => c.name === 'bot');
          const embed = new Discord.RichEmbed()
          .setTitle("Level Up!")
          .setDescription(message.author + " has just reached level 4. To view your total XP, type !viewxp in the " + botChannel + " channel!")
          .setColor("#42f46e");
          expChannel.send({embed});
          message.member.addRole(role.id);
        }
      }
  });
});
}

exports.sortTable = function sortTable(message)
{
  con.query("SELECT * FROM level ORDER BY xp DESC", (err, result) => {
    if(err) throw err;
    //console.log(result);
    result.forEach( result => {
      var someMember = message.guild.members.find(gm => gm.id === result.id);

      console.log("Username: " + someMember.nickname + " XP: " + result.xp);
    });


  });
}

function xpGenerate()
{
  return Math.floor(Math.random() * 50);
}
