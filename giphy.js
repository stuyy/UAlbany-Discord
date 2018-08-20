const key = process.env.GIPHY_KEY;
const request = require('request');

exports.sendGIF = function sendGIF(message, searchQuery)
{
  var url = 'https://api.giphy.com/v1/gifs/search?api_key=' + key + '&q=' + searchQuery + '&limit=250&offset=0&rating=G&lang=en';
  console.log(url);

  // limit is 250, but there may not be 250 results.
  request(url, function(err, res, body){
    var queryData = JSON.parse(body);
    var resultLength = queryData.data.length;
    console.log(resultLength + " gifs found");
    var number = Math.floor(Math.random() * resultLength);
    console.log(number);
    if(queryData.data.length === 0)
    {
      message.channel.send("No results found.");
    }
    else
    {
      message.channel.send(queryData.data[number].bitly_url);
    }
  });

}
