const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
client.login(config.token);

client.on("ready", () => {

  console.log("Logged in successfully!");
  client.user.setActivity('with Federal Loans | "!help" for more info', {type: 'PLAYING'});

});
client.on('guildMemberAdd', member => {

});

client.on('guildMemberRemove', member => {
  
});


client.on('messageDelete', message => {

});

client.on('message', message => {

  if(message.author.bot) return;
  
  
}); // End of message event.
