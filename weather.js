const Discord = require('discord.js');
const client = new Discord.Client();
var request = require('request');

client.on('ready', () => {

  console.log("Ready!");
})

client.on('message', message => {

  if(message.content === '!weather')
  {

    message.channel.send("What is your city?");
    const filter = m => (!m.author.bot);

    message.channel.awaitMessages(filter, { max: 1, time: 0, errors: ['time'] })
    .then(collected => {
      console.log(collected.first().content);
      cityName = collected.first().content;
      console.log("The city name is: " + cityName);
      var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=b72c192b44cefcc6c901db99aaa5823e';
      getTemp(message, url, cityName);
    })
    .catch(collected => console.log(`After 5 seconds, only ${collected.size} out of 4 voted.`));


  }


});

function returnTemp()
{

}

function kelToF(temp)
{
  return (temp*(9/5)) - 459.67;
}

function getTemp(m, url, city)
{
  request(url, function(err, res, body) {

    console.log(url);
    //
    var data = JSON.parse(body);
    if(data.cod === "404")
    {
      m.channel.send("Invalid City Provided, try again.");
    }
    else {
      var temp = kelToF(data.main.temp);
      m.channel.send("The current temperature in " + city + " is: " + Math.ceil(temp) + " degrees fahrenheight.");
    }
  })
}

client.login("NDc0NTE5Mzk1NjEyMjI5NjUy.DkRqLA.H-fK6Pr5XLvA9Dem052KZ3-5vMs");
