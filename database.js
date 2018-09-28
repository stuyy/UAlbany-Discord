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
      let userLevel = result.userLevel;
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

function checkUserLevel(message)
{
  con.query(`SELECT * FROM level WHERE id = ${message.author.id}`, (err, results) => {
    if(err) throw err;
    let authorName = message.author.username + "#" + message.author.discriminator + "'s user data";
    const embed = new Discord.RichEmbed()
    .setColor("#42dcf4")
    .setAuthor(authorName, message.author.displayAvatarURL)
    .addField("Total XP: ", results[0].xp, true)
    .addField("User Level: ", results[0].userLevel, true);
    message.channel.send({embed});
  });
}

function xpGenerate(message)
{
  let msgContent = message.content.toLowerCase().split(' ').join('');
  let msgCount = msgContent.length;

  let randomPercentage = Math.floor((Math.random() * 5) + 6)/10; // Random percentage multiplier.
  console.log("The percentage is " + randomPercentage.toFixed(2) + " and we are multiplying it by " +
  return Math.ceil(randomPercentage * msgCount + Math.ceil(msgCount/2)) * 10;
}

exports.getUserData = function getUserData(message)
{
  let authorID = message.author.id;

  con.query(`SELECT * FROM level WHERE id = ${authorID}`, function(err, results, fields) {
    if(err) throw err;
    console.log(message.author + " has " + results[0].xp + " xp!");
    let totalUserXP = results[0].xp;
    checkUserLevel(message);
  });

}

function showLevelUpMessage(message, level)
{
  con.query(`SELECT * FROM level WHERE id = ${message.member.id}`, (err, results, fields) => {
    if(err) throw err;
    console.log(results[0].userLevel + " AND " + level);
    if(results[0].userLevel != level) //If the user level from the DB is not equal to the level from checkXP.
    {
      var expChannel = message.guild.channels.find(c => c.name === 'xp-levels');
      var botChannel = message.guild.channels.find(c => c.name === 'bot');
      const embed = new Discord.RichEmbed()
      .setTitle("Level Up!")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setDescription(message.author + ` has just reached level ${level}. To view your total XP, type !viewxp in the ` + botChannel + " channel!")
      .setColor("#42f46e");
      expChannel.send(embed);

      // Now update their level.
      con.query(`UPDATE level SET userLevel = ${level} WHERE id = ${message.member.id}`, (err) => {
        if(err) throw err;
        console.log("User level set to " + level + " from level " + results[0].level);
      });
    }
    else
    {
      console.log("User already leveled up");
    }
  });

}
function checkXP(message, result)
{
  if(result[0].xp >= 240 && result[0].xp < 720)
    showLevelUpMessage(message, 1);
  else if(result[0].xp >= 720 && result[0].xp < 1440)
    showLevelUpMessage(message, 2);
  else if(result[0].xp >= 1440 && result[0].xp < 2880)
    showLevelUpMessage(message, 3);
  else if(result[0].xp >= 2880 && result[0].xp < 5760)
    showLevelUpMessage(message, 4);
  else if(result[0].xp >= 5760 && result[0].xp < 11520)
    showLevelUpMessage(message, 5);
  else if(result[0].xp >= 11520 && result[0].xp < 23040)
    showLevelUpMessage(message, 6);
  else if(result[0].xp >= 23040 && result[0].xp < 57600)
    showLevelUpMessage(message, 7);
  else if(result[0].xp >= 57600 && result[0].xp < 144000)
    showLevelUpMessage(message, 8);
  else if(result[0].xp >= 144000 && result[0].xp < 360000)
    showLevelUpMessage(message, 9);
  else if(result[0].xp >= 360000 && result[0].xp < 900000)
    showLevelUpMessage(message, 10);
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
        let sql = `INSERT INTO level (id, xp, userLevel) VALUES ('${member.id}', 0, 0)`;
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
