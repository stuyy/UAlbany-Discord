const shell = require('shelljs');
const fs = require('fs');

exports.runJava = function runJava(message)
{


  fs.writeFile('Test.java', message, err => {
    if(err) throw err;
    console.log("Succesfully written!");

    shell.exec('javac Test.java');
    shell.exec('java Test');

  });

}
