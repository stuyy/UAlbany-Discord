const Discord = require('discord.js');
const client = new Discord.Client();
const mysql = require('mysql');
client.login('NDg3MTU1NzE1MTc4MjMzODU2.DnJiqg.5zC2k7n4zkeh_ejw6OpEwrXhJis');

var con = mysql.createConnection({
  host: "us-cdbr-iron-east-01.cleardb.net",
  user: "bd535318c0af59",
  password: "3a0f9dd2",
  database: "heroku_d4680b9c66a1a38"
});

con.connect(function(err) {
  if(err) throw err;
  console.log("Connected Successfully!");
})
client.on('ready', ()=> {

  console.log("Ready!");

});

function xpGenerate(msg)
{
  var size = msg.content.length;
  console.log(size);
  return size/2;
}
client.on('message', message => {

  if(message.author.bot) return;

  if(message.content.toLowerCase() === '!command')
  {
    console.log("Some command");
  }
  else if(message.content.toLowerCase() === '!create')
  {
    var sql = "CREATE TABLE level (id VARCHAR(100), xp MEDIUMINT)";
    con.query(sql, (err, result) => {
      if(err) throw err;
      console.log("Table created");
    });
  }
  else if(message.content.toLowerCase() === '!view')
  {
    var sql = "SELECT * FROM level";
    con.query(sql, (err, result, fields) => {
      if(err) throw err;
      console.log(result);
    });
  }
  else if(message.content.toLowerCase() === '!drop')
  {
    con.query("DROP TABLE level", err =>{
      if(err) throw err;
      console.log("Success");
    })
  }
  else { // User actually wrote a message.
    con.query(`SELECT * FROM level WHERE id = '${message.author.id}'`, (err, rows) => {
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
    });

    
  }

});
