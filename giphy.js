const key = process.env.GIPHY_KEY;
const request = require('request');

exports.sendGIF = function sendGIF(message, searchQuery)
{
  var number = Math.floor(Math.random() * 50);
  var url = 'https://api.giphy.com/v1/gifs/search?api_key=' + key + '&q=' + searchQuery + '&limit=1&offset=' + number + '&rating=G&lang=en';
  console.log(url);

  // limit is 250, but there may not be 250 results.
  request(url, function(err, res, body){
    var queryData = JSON.parse(body);
    if(queryData.message === "API rate limit exceeded")
    {
      message.channel.send("Too many requests... Please wait and try again later");
    }
    else {

      console.log(number);
      if(queryData.data.length === 0)
      {
        message.channel.send("No results found.");
      }
      else
      {
        message.channel.send(queryData.data[0].bitly_url);
      }
    }
  });

}
