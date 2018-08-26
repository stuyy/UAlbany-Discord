const maps = require('./ualbany_maps.json');
const Discord = require('discord.js');

exports.showMap = function showMap(message)
{
  let args = message.content.split(" ");
  if(args.length > 1)
  {
    let i = 1;
    while(i<args.length)
    {
      if(maps.hasOwnProperty(args[i]))
      {
        let k = 0;
        let m = args[i];
        console.log(m);
        while(k<maps[m].length)
        {
          console.log("Major: " + maps[m][k].major + "\nDegree: " + maps[m][k].degree + "\nMap: ");
          message.channel.send("Major: " + maps[m][k].major + "\nDegree: " + maps[m][k].degree, {files: [ maps[m][k].map ]});
          k++;
        }
      }
      i++;
    }
  }
}

exports.showHours = function showHours(message)
{
  let args = message.content.toLowerCase().split(" ");
  if(args[1] === 'dh')
  {
    const embed = new Discord.RichEmbed()
      .setTitle("UAlbany Dining Hall Hours of Operation")
      .setColor(6881105)
      .setImage('./dining-hall.png');

    message.channel.send({embed});
  }
}
