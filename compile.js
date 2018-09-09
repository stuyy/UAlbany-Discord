const shell = require('shelljs');
const fs = require('fs');

exports.runJava = function runJava(code, message)
{

  fs.writeFile('Test.java', code, err => {
    if(err) throw err;
    console.log("Succesfully written!");

    shell.exec('javac Test.java');
    shell.exec("java Test >> output.txt");

    const linereader = require('readline').createInterface({
      input: require('fs').createReadStream('output.txt');
    });

    linereader.on('line', line => {
      message.channel.send("Result: " + line);
    });

  });

}
