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

      checkXP(message, result);

  });
});
}

exports.sortTable = function sortTable(message)
{
  con.query("SELECT * FROM level ORDER BY xp DESC", (err, result) => {
    if(err) throw err;
    //console.log(result);
    var arr = [];
    result.forEach( result => {
      var someMember = message.guild.members.find(gm => gm.id === result.id);

      //console.log("Username: " + someMember.user.username + " XP: " + result.xp);
      let user = new User(someMember.user.username, someMember.id, result.xp);
      arr.push(user);

      //arr.push("Name: " + someMember.user.username + "\nTotal XP: " + result.xp + "\n");


    });
    //console.log(arr);

    const embed = new Discord.RichEmbed()
    .setTitle("Top 10 Leaderboards for Server XP")
    .setColor("#42f46e")
    .addField("User: ", arr[0].name)
    .addField("XP: ", arr[0].xp)
    .addField("User: ", arr[1].name)
    .addField("XP: ", arr[1].xp)
    .addField("User: " arr[2].name)
    .addField("XP: ", arr[2].xp);
    message.channel.send({embed});

  });
}

class User
{
  constructor(name, id, xp)
  {
    this.name = name;
    this.id = id;
    this.xp = xp;
  }
}
function xpGenerate()
{
  return Math.floor(Math.random() * 25);
}

function checkLevel()
{

}

function checkXP(message, result)
{
  if(result[0].xp >= 240 && result[0].xp < 720)
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
      .setAuthor(message.author.username, message.author.avatarURL)
      .setDescription(message.author + " has just reached level 1. To view your total XP, type !viewxp in the " + botChannel + " channel!")
      .setColor("#42f46e");
      expChannel.send({embed});
      message.member.addRole(role.id);
    }
  }
  else if(result[0].xp >= 720 && result[0].xp < 1440)
  {
    var role = message.guild.roles.find(roles => roles.name === 'Rank Two');
    if(message.member.roles.has(role.id))
      console.log("User already leveled up.");

    else
    {
      var expChannel = message.guild.channels.find(c => c.name === 'xp-levels');
      var botChannel = message.guild.channels.find(c => c.name === 'bot');
      const embed = new Discord.RichEmbed()
      .setTitle("Level Up!")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setDescription(message.author + " has just reached level 2. To view your total XP, type !viewxp in the " + botChannel + " channel!")
      .setColor("#42f46e");
      expChannel.send({embed});
      message.member.addRole(role.id);
    }
  }
  else if(result[0].xp >= 1440 && result[0].xp < 2880)
  {
    var role = message.guild.roles.find(roles => roles.name === 'Rank Three');
    if(message.member.roles.has(role.id))
      console.log("User already leveled up.");

    else
    {
      var expChannel = message.guild.channels.find(c => c.name === 'xp-levels');
      var botChannel = message.guild.channels.find(c => c.name === 'bot');
      const embed = new Discord.RichEmbed()
      .setTitle("Level Up!")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setDescription(message.author + " has just reached level 3. To view your total XP, type !viewxp in the " + botChannel + " channel!")
      .setColor("#42f46e");
      expChannel.send({embed});
      message.member.addRole(role.id);
    }
  }
  else if(result[0].xp >= 2880 && result[0].xp < 5760)
  {
    var role = message.guild.roles.find(roles => roles.name === 'Rank Four');
    if(message.member.roles.has(role.id))
      console.log("User already leveled up.");

    else
    {
      var expChannel = message.guild.channels.find(c => c.name === 'xp-levels');
      var botChannel = message.guild.channels.find(c => c.name === 'bot');
      const embed = new Discord.RichEmbed()
      .setTitle("Level Up!")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setDescription(message.author + " has just reached level 4. To view your total XP, type !viewxp in the " + botChannel + " channel!")
      .setColor("#42f46e");
      expChannel.send({embed});
      message.member.addRole(role.id);
    }
  }
  else if(result[0].xp >= 5760 && result[0].xp < 11520)
  {
    var role = message.guild.roles.find(roles => roles.name === 'Rank Five');
    if(message.member.roles.has(role.id))
      console.log("User already leveled up.");

    else
    {
      var expChannel = message.guild.channels.find(c => c.name === 'xp-levels');
      var botChannel = message.guild.channels.find(c => c.name === 'bot');
      const embed = new Discord.RichEmbed()
      .setTitle("Level Up!")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setDescription(message.author + " has just reached level 5. To view your total XP, type !viewxp in the " + botChannel + " channel!")
      .setColor("#42f46e");
      expChannel.send({embed});
      message.member.addRole(role.id);
    }
  }
  else if(result[0].xp >= 11520 && result[0].xp < 23040)
  {
    var role = message.guild.roles.find(roles => roles.name === 'Rank Six');
    if(message.member.roles.has(role.id))
      console.log("User already leveled up.");

    else
    {
      var expChannel = message.guild.channels.find(c => c.name === 'xp-levels');
      var botChannel = message.guild.channels.find(c => c.name === 'bot');
      const embed = new Discord.RichEmbed()
      .setTitle("Level Up!")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setDescription(message.author + " has just reached level 6. To view your total XP, type !viewxp in the " + botChannel + " channel!")
      .setColor("#42f46e");
      expChannel.send({embed});
      message.member.addRole(role.id);
    }
  }
  else if(result[0].xp >= 23040 && result[0].xp < 57600)
  {
    var role = message.guild.roles.find(roles => roles.name === 'Rank Seven');
    if(message.member.roles.has(role.id))
      console.log("User already leveled up.");

    else
    {
      var expChannel = message.guild.channels.find(c => c.name === 'xp-levels');
      var botChannel = message.guild.channels.find(c => c.name === 'bot');
      const embed = new Discord.RichEmbed()
      .setTitle("Level Up!")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setDescription(message.author + " has just reached level 7. To view your total XP, type !viewxp in the " + botChannel + " channel!")
      .setColor("#42f46e");
      expChannel.send({embed});
      message.member.addRole(role.id);
    }
  }
  else if(result[0].xp >= 57600 && result[0].xp < 144000)
  {
    var role = message.guild.roles.find(roles => roles.name === 'Rank Eight');
    if(message.member.roles.has(role.id))
      console.log("User already leveled up.");

    else
    {
      var expChannel = message.guild.channels.find(c => c.name === 'xp-levels');
      var botChannel = message.guild.channels.find(c => c.name === 'bot');
      const embed = new Discord.RichEmbed()
      .setTitle("Level Up!")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setDescription(message.author + " has just reached level 8. To view your total XP, type !viewxp in the " + botChannel + " channel!")
      .setColor("#42f46e");
      expChannel.send({embed});
      message.member.addRole(role.id);
    }
  }
  else if(result[0].xp >= 144000 && result[0].xp < 360000)
  {
    var role = message.guild.roles.find(roles => roles.name === 'Rank Nine');
    if(message.member.roles.has(role.id))
      console.log("User already leveled up.");

    else
    {
      var expChannel = message.guild.channels.find(c => c.name === 'xp-levels');
      var botChannel = message.guild.channels.find(c => c.name === 'bot');
      const embed = new Discord.RichEmbed()
      .setTitle("Level Up!")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setDescription(message.author + " has just reached level 9. To view your total XP, type !viewxp in the " + botChannel + " channel!")
      .setColor("#42f46e");
      expChannel.send({embed});
      message.member.addRole(role.id);
    }
  }
  else if(result[0].xp >= 360000 && result[0].xp < 900000)
  {
    var role = message.guild.roles.find(roles => roles.name === 'Rank Ten');
    if(message.member.roles.has(role.id))
      console.log("User already leveled up.");

    else
    {
      var expChannel = message.guild.channels.find(c => c.name === 'xp-levels');
      var botChannel = message.guild.channels.find(c => c.name === 'bot');
      const embed = new Discord.RichEmbed()
      .setTitle("Level Up!")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setDescription(message.author + " has just reached level 10. To view your total XP, type !viewxp in the " + botChannel + " channel!")
      .setColor("#42f46e");
      expChannel.send({embed});
      message.member.addRole(role.id);
    }
  }
}
