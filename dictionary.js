const request = require('request');
const http = require('http');
var options = {

  url: 'https://od-api.oxforddictionaries.com/api/v1/entries/en/phone',
  headers : {
    'Accept' : 'application/json',
    'app_id' : 'd0138784',
    'app_key' : '5279fb80fe82ba301741a1435897835d'
  }

}

request(options, function(err, res, body) {
  if(err) throw err;
  console.log("Success!");
  console.log(body);
});
