const request = require('request');
const readline = require('readline');

const url = 'https://od-api.oxforddictionaries.com/api/v1/entries/en/';
function defineWord(word)
{
  let url = "https://od-api.oxforddictionaries.com/api/v1/entries/en/" + word;
  let options = {
    url: url,
    headers : {
      'Accept' : 'application/json',
      'app_id' : 'd0138784',
      'app_key' : '5279fb80fe82ba301741a1435897835d'
    }
  }
  return new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
      let header = res.headers['content-type'];
      if(header.includes('application/json'))
        resolve(JSON.parse(body));
      else
        reject("Invalid Word or failed to request data");
    });
  });
}

//defineWord("dsadsadsad").then(json => console.log(json)).catch(err => console.log(err));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter a word', answer => {
  console.log("Looking up the word " + answer);
  defineWord(answer)
  .then(result => {

    let definitionsArray = [];
    let data = result['results'];
    let lexical = data[0].lexicalEntries; // lexicalEntries is an array that holds objects.
    // lexical is an array of objects.
    for(var i = 0; i<lexical.length; i++) // Loop through each object inside lexicalEntries.
    {
      for(var k in lexical[i]) // For each key inside the object in the lexicalEntries array.
      {
        if(k === 'entries') // If the keyword is equal to entries.
        {
          let entries = lexical[i][k]; // Let entries be assigned lexical, at subscript 0, which is lexicalEntries[0].entries.
          for(var c = 0; c < entries.length; c++)
            for(b = 0; b < entries[c].senses.length; b++)
              definitionsArray.push(entries[c].senses[b].definitions[0]);
        }
      }
    }

    if(definitionsArray)
      return Promise.resolve(definitionsArray);
    else
      return Promise.reject("Bad Array");
  })
  .then(arr => console.log(arr)).catch(err => console.log(err))
  .catch(err => console.log(err));
});
