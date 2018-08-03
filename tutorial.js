const botconfig = require('./botconfig.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const path = require('path');
const pdf = require('pdf-poppler');
const request = require('request');
const cheerio = require('cheerio');
var https = require('https');
var fs = require('fs');




client.login(botconfig.token);

client.on('guildMemberAdd', member => {

console.log("A new user has arrived!");
member.send("Welcome to the server");

});
client.on('ready', ()=> {
  console.log('The bot is now online!');
});

client.on('message', message => {

  if(message.channel.name === "welcome")
  {
    console.log("User sent a message in the welcome channel");
    if(message.content.toLowerCase() === 'i agree')
    {
      console.log("User agreed to terms and rules");
      addUserRole('New User', message);
      message.author.send("Congratulations! You now have access to all of the server channels!");
      message.delete();
    }
    else {
      // Delete a message
message.delete()
  .then(msg => console.log(`Deleted message from ${msg.author.username}`))
  .catch(console.error);
    }
  }

  if(message.content.toLowerCase().startsWith("!addrole"))
  {
    var args = message.content.toLowerCase().split(" ");
    console.log(args);
    if(args[1] === 'sa2018')
    {
      var role = message.guild.roles.find('name', 'Steam Awards 2018');
      console.log("Role found!");
      message.member.addRole(role.id);
      message.channel.send('Role successfully added!');

    }
    else if(args[1] === 'helper')
    {
      addUserRole('Helper', message);
      message.channel.send('Role successfully added!');
    }
    else if(args[1] === 'youtuber')
    {

    }
  }

  else if(message.content.toLowerCase() === '!hours')
  {
    convert("hours", message);

  }

  else if(message.content.toLowerCase() === '!accpdf')
  {
    convert("accounting", message);
  }
});



function convert(fileName, message)
{
  let file = "./Major_MAPS/" + fileName + ".pdf";
  let opts = {
      format: 'png',
      out_dir: path.dirname("./PDF_IMAGES"),
      out_prefix: path.basename(file, path.extname(file)),
      page: null
  }
  pdf.convert(file, opts)
  .then(res => {
      console.log('Successfully converted');
      message.channel.send('Hours of Operation: ', {files: ['./Major_MAPS/' + fileName + '-1.png']});
  })
  .catch(error => {
      console.error(error);
  });
}
/*
function requestPDF(fileName, convertPDF, message)
{
  var pdfLink = [];
  var url = "https://www.albany.edu/uas/hours.php";
  request(url, function(error, response, body) {

    const $ = cheerio.load(body);

    //console.log($('div.text-box a').attr("href"));
    $('a').each(function() {

      var link = $(this).attr("href");
      if(link.endsWith(".pdf"))
        pdfLink.push("http://albany.edu" + link);


    });
    console.log("Link: " + pdfLink);
    // After we get the link, we save it to our system.
    pdfURL = "https://www.albany.edu/uas/files/6.25-8.20_Summer_Hours.pdf";
    /*
    var file = fs.createWriteStream("hours.pdf");
    var request = https.get(pdfURL, function(response){
      response.pipe(file);
    });

    var download = function(url, dest, cb)
    {
      var file = fs.createWriteStr
    }

  });

  convertPDF(fileName, message);
}


function convertPDF(file, message)
{
  let opts = {
      format: 'jpeg',
      out_dir: path.dirname(file),
      out_prefix: path.basename(file, path.extname(file)),
      page: null
  }
  pdf.convert(file, opts)
      .then(res => {
          console.log('Successfully converted');
          message.channel.send('Hours of Operation: ', {files: ['./hours-1.jpg']});
      })
      .catch(error => {
          console.error(error);
      });
}
*/
function addUserRole(roleName, message)
{
    var role = message.guild.roles.find('name', roleName);
    message.member.addRole(role.id);
    return;
}
