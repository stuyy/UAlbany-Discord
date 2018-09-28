const mysql = require('mysql');
const Discord = require('discord.js');
var con = mysql.createConnection({
  "host" : "localhost",
  "user": "username",
  "password": "Password1337PLUS#",
  "database": "botData"
});
con.connect(function(err) {
  if(err) throw err;
  console.log("Connected Successfully from trivia.js!");
});

exports.displayQuestion = function displayQuestion(message)
{

}
