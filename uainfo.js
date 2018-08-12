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
        let maj = args[i];
        console.log(maj);
        while(k<maps[maj].length)
        {
          console.log("Major: " + maps[maj][k].major + "\nDegree: " + maps[maj][k].degree + "\nMap: ");
          k++;
        }
      }
      i++;
    }
  }
}
