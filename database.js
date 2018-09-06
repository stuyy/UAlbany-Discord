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
