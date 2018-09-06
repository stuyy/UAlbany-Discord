const mysql = require('mysql');
const config = require('./config.json');
var con = mysql.createConnection(config.info);
con.connect(function(err) {
  if(err) throw err;
  console.log("Connected Successfully!");
});
