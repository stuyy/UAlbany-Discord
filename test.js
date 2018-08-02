var http = require('http');
var cityName = "New York";
var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=b72c192b44cefcc6c901db99aaa5823e';

var request = require('request');
/*
request(url, function(err, res, body) {

  var data = JSON.parse(body);
  console.log(data.weather[0].description);
  console.log(data.main.temp);
  var temp = kelToF(data.main.temp);
  console.log("Temperature (F): " + temp);
})
*/

getTemp();

function kelToF(temp)
{
  return (temp*(9/5)) - 459.67;
}

function getTemp(callback)
{
  request(url, function(err, res, body) {

    var data = JSON.parse(body);
    console.log(data.weather[0].description);
    console.log(data.main.temp);
    var temp = kelToF(data.main.temp);
    console.log("Temperature (F): " + temp);

    callback(temp);
  })
}
