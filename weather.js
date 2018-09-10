const request = require('request');
const config = require('./config.json');
const Discord = require('discord.js');
exports.getWeather = function getWeather(message)
{
  let command = message.content.substr(0, message.content.indexOf(' ')); // should be !weather
  let city = message.content.substr(message.content.indexOf(' ')+1);
  let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + config.weather_API;
  console.log(command);
  console.log(city);
  console.log(url);
  requestData(url, message);
}

exports.getForecast = function getForecast(message)
{
  let command = message.content.substr(0, messgae.content.indexOf(' '));
  let city = message.content.substr(message.content.indexOf(' ')+1);
  let url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + config.weather_API;

}

function requestData(url, message)
{
  request(url, function(err, res, body){
    var weatherData = JSON.parse(body);
    if(weatherData.cod === "404")
      message.channel.send("Invalid city provided, try again.");
    else {
      let temp = kelToF(weatherData.main.temp);
      let maxTemp = kelToF(weatherData.main.temp_max);
      let minTemp = kelToF(weatherData.main.temp_min);
      //let condition = weatherData.weather[0].main;
      let conditions = [];
      var i = 0;
      console.log("There are " + weatherData.weather.length  + " conditions");
      while(i<weatherData.weather.length)
        conditions.push(weatherData.weather[i++].main);

      console.log(conditions);
      /*
      message.channel.send("The current temperature in " + weatherData.name + ", " + weatherData.sys.country + " is: " + temp + ".\nThe max temperature is: " + maxTemp + ".\nThe min temperature is: " + minTemp + ".\nThe condition is currently: " + conditions.join(", ")); */
      let location = weatherData.name + ", " + weatherData.sys.country;
      const embed = new Discord.RichEmbed()
      .setTitle("Weather Data")
      .setDescription("Provides a brief description of the weather in the specified city")
      .addField("City: ", location, true)
      .addField("Temperature: ", temp, true)
      .addField("Max Temperature: " , maxTemp, true)
      .addField("Min Temperature: ", minTemp, true)
      .addField("Current Conditions: ", conditions.join(","), true);
      
      message.channel.send({embed});

    }
  });

}
var kelToF = temp => Math.ceil((temp*(9/5))-459.67);
