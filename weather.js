exports.getTemperature = function getTemperature(m)
{
  let command = m.content.substr(0, m.content.indexOf(' ')); // should be !weather
  let city = m.content.substr(m.content.indexOf(' ')+1);
  console.log(command);
  console.log(city);
}
