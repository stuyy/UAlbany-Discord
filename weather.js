const request = require('request');

exports.getWeather = function getWeather(message)
{
  let command = message.content.substr(0, message.content.indexOf(' ')); // should be !weather
  let city = message.content.substr(message.content.indexOf(' ')+1);
  let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=b72c192b44cefcc6c901db99aaa5823e';
  console.log(command);
  console.log(city);
  console.log(url);
  requestData(url, message);
}

function requestData(url, message)
{
  request(url, function(err, res, body){
    var weatherData = JSON.parse(body);
    if(weatherData.cod === "404")
      msg.channel.send("Invalid city provided, try again.");
    else {
      let temp = kelToF(weatherData.main.temp);
      let maxTemp = kelToF(weatherData.main.temp_max);
      let minTemp = kelToF(weatherData.main.temp_min);
      let condition = weatherData.weather[0].main;
      message.channel.send("The current temperature in " + weatherData.name + " is: " + temp + ". The max is: " + maxTemp + " and the min is: " + minTemp + ". The condition is currently: " + condition);
    }
  });

}
function kelToF(temp)
{
  return (temp*(9/5)) - 459.67;
}
