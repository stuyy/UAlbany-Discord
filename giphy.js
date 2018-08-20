const key = process.env.GIPHY_KEY;
const request = require('request');

exports.sendGIF = function sendGIF(message, searchQuery)
{
  var number = Math.floor(Math.random() * 50);
  var url = 'https://api.giphy.com/v1/gifs/random?api_key='+key+'&tag='+searchQuery+'&rating=G';
  console.log(url);

  // limit is 250, but there may not be 250 results.
  request(url, function(err, res, body){
    var queryData = JSON.parse(body);
    message.channel.send({files: [new Attachment(queryData.data.images.original.url), new Attachment('./giphy.png', 'giphy')]});
  });

}
