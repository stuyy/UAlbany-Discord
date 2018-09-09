const config = require('./config.json');
const request = require('request');
const Discord = require('discord.js');
exports.search = function search(message, query) // Takes in the message object, and the query(search)
{
  var gallery_search_url = 'https://api.imgur.com/3/gallery/search/viral/?q_exactly=' + query + '&&client_id=' + config.imgur_client_id;
  request(gallery_search_url, function(err, res, body){
    try
    {
      var queryData = JSON.parse(body);
      var arrayLength = queryData.data.length;
      console.log("Results: " + arrayLength);
      var random = Math.floor(Math.random() * arrayLength);
      message.channel.send(queryData.data[random].link);
    }
    catch(error)
    {
      console.log(error);
    }
  })
}
