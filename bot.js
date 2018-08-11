const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('request');
const commands = require('./commands.js');
const botinfo = require('./botinfo.json');
const weather = require('./weather.js');

client.login(process.env.BOT_TOKEN);

client.on("ready", () => {

  console.log("Logged in successfully!");
  client.user.setActivity('with Federal Loans | "!help" for more info', {type: 'PLAYING'});

});

client.on('guildMemberAdd', member => {

  var generalChannel = client.channels.find('name', 'general');
  console.log(member.user.username);
  console.log(generalChannel.name);
  console.log("Welcome " + member.user.username + "! Be sure to check out the rules and information channel!");

});

client.on('message', message => {

  if(message.content === '!help')
    message.channel.send(botinfo.commandList);

  else if(message.content === '!roles')
    message.channel.send(botinfo.roleList);


  else if(message.content.toLowerCase().startsWith("!weather"))
  {
    weather.getWeather(message);
    //message.channel.send("What is your city?");
    /*
    const filter = m => (!m.author.bot);
    message.channel.awaitMessages(filter, {max: 1, time: 0, errors: ['time'] })
    .then(collected => {
      cityName = collected.first().content;
      var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=b72c192b44cefcc6c901db99aaa5823e';
      getTemp(message, url, cityName);
    })
    .catch(collected => console.log("Error"));
    */
  }

  else if(message.content.startsWith("!addrole"))
  {

    if(message.channel.name === "bot2" || message.channel.name === "bot")
      commands.addRole(message);
    else
      message.channel.send("You must use this command in the #bot channel!");

  }

  else if(message.content.startsWith("!deleterole"))
  {
    if(message.channel.name === "bot2" || message.channel.name === "bot")
      commands.deleteRole(message);
    else
      message.channel.send("You must use this command in the #bot channel!");
  }

}); // End of message event.


function kelToF(temp)
{
  return (temp*(9/5)) - 459.67;
}

function getTemp(msg, url, city)
{
  request(url, function(err, res, body) {
    var data = JSON.parse(body);
    if(data.cod === "404")
      msg.channel.send("Invalid city provided, try again.");

      else {
        var temp = kelToF(data.main.temp);
        var condition = data.weather[0].main;
        msg.channel.send("The current temperature in " + city + " is " + Math.ceil(temp) + " degrees F. Weather condition: " + condition);
      }
  })
}
