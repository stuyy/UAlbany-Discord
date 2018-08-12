const maps = require('./ualbany_maps.json');

exports.showMap = function showMap(message)
{
  let args = message.content.split(" ");
  if(args.length > 1)
  {
    let i = 1;
    while(i<args.length)
    {
      if(maps.hasOwnProperty(args[i]))
      {
        let k = 0;
        while(k<maps.args[i].length)
        {
          console.log("Major: " + maps.args[i][k].major + "\nDegree: " + maps.args[i][k].degree + "\nMap: ");
          k++;
        }
      }
      i++;
    }
  }
}
