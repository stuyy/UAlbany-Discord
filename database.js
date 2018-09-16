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
      let acquiredXP = xpGenerate(message);
      let sql = `INSERT INTO level (id, xp) VALUES ('${message.author.id}', ${acquiredXP})`;
      con.query(sql, (err, result) => {
        if(err) throw err;
        console.log(message.author.username + " acquired " + acquiredXP + " XP!");
      });
    }
    else
    {
      let previousXP = rows[0].xp;
      let acquiredXP = xpGenerate(message);
      let updatedXP = previousXP + acquiredXP;
      let sql = `UPDATE level SET xp = ${updatedXP} WHERE id = '${message.author.id}'`;
      con.query(sql, (err, result) => {
        if(err) throw err;
        console.log(message.author.username + " acquired " + acquiredXP +  " total XP!");
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
    result.forEach(result => {
      var someMember = message.guild.members.find(gm => gm.id === result.id);
      let userLevel = checkUserLevel(result.xp);
      //console.log("Username: " + someMember.user.username + " XP: " + result.xp);
      arr.push("**Name:** " + someMember.user + "\n**Total XP:** " + result.xp + "\n**Level:** " + userLevel + "\n");

    });
    arr.length = 10;
    const embed = new Discord.RichEmbed()
    .setColor("#42f46e")
    .addField("Top 10 Leaderboards(User XP):\n\n", arr);
    message.channel.send({embed});

  });
}

function checkUserLevel(xpCount)
{
  if(xpCount >= 240 && xpCount < 720)
    return 1;
  else if(xpCount >= 720 && xpCount < 1440)
    return 2;
  else if(xpCount >= 1440 && xpCount < 2880)
    return 3;
  else if(xpCount >= 2880 && xpCount < 5760)
    return 4;
  else if(xpCount >= 5760 && xpCount < 11520)
    return 5;
  else if(xpCount >= 11520 && xpCount < 23040)
    return 6;
  else if(xpCount >= 23040 && xpCount < 57600)
    return 7;
  else if(xpCount >= 57600 && xpCount < 144000)
    return 8;
  else if(xpCount >= 144000 && xpCount < 360000)
    return 9;
  else if(xpCount >= 360000 && xpCount < 900000)
    return 10;
}

function xpGenerate(message)
{
  let msgContent = message.content.toLowerCase().split(' ').join('');
  let msgCount = msgContent.length;

  let randomPercentage = Math.random()/5; // Random percentage multiplier.
  console.log("The percentage is " + randomPercentage.toFixed(2) + " and we are multiplying it by " + msgCount);
  return Math.ceil(randomPercentage * msgCount) + Math.ceil(msgCount/6);

}

exports.checkLevel = function checkLevel(message)
{
  let authorID = message.author.id;

  con.query(`SELECT * FROM level WHERE id = ${authorID}`, function(err, results, fields) {
    if(err) throw err;
    console.log(message.author + " has " + results[0].xp + " xp!");
    let totalUserXP = results[0].xp;
    let userLevel = checkUserLevel(totalUserXP);
    let authorName = message.author.username + "#" + message.author.discriminator + "'s user data";
    const embed = new Discord.RichEmbed()
    .setColor("#42dcf4")
    .setAuthor(authorName, message.author.displayAvatarURL)
    .addField("Total XP: ", results[0].xp, true)
    .addField("User Level: ", userLevel, true);
    message.channel.send({embed});
  });

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

exports.deleteXP = function deleteXP(memberID, xp)
{
  con.query(`SELECT * FROM level WHERE id = ${memberID}`, (err, results, fields) => {
    if(err) throw err;
    let currentUserXP = results[0].xp;
    let updatedXP = currentUserXP - xp;
    con.query(`UPDATE level SET xp = ${updatedXP} WHERE id = ${memberID}`, (err, result, fields) => {
      if(err) throw err;
      console.log("Successfully removed " + xp + " xp from " + memberID);
    })
  });
}

exports.modifyDB = function modifyDB(status, member)
{
  if(status)
  {
    con.query(`SELECT * FROM level WHERE id = ${member.id}`, (err, rows) => {
      if(err) throw err;
      if(rows.length < 1)
      {
        let sql = `INSERT INTO level (id, xp) VALUES ('${member.id}', 0)`;
        con.query(sql, (err, result) => {
          if(err) throw err;
          console.log("Successfully updated XP for " + member.user.username);
        });
      }
      else
      {
        let xp = rows[0].xp;
        let sql = `UPDATE level SET xp = 0 WHERE id = '${member.id}'`;
        con.query(sql, (err, result) => {
          if(err) throw err;
          console.log("Successfully updated XP for " + member.user.username);
        });
      }
    });
  }
  else {
    con.query(`DELETE FROM level WHERE id = ${member.id}`, (err, result) => {
      if(err) throw err;
      console.log("Cleared data for " + member.user.username);
    });
  }
}
