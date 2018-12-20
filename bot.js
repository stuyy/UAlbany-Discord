const Discord = require('discord.js');
const client = new Discord.Client();
const CONFIG = require('./config.json');
const Member = require('./models/member');
client.login(CONFIG.token);

client.on("ready", () => {

  console.log("Logged in successfully!");
  client.user.setActivity('with Federal Loans | "!help" for more info', {type: 'PLAYING'});

});
client.on('guildMemberAdd', member => {

  var newMember = {
    username: member.user.username,
    clientID: member.id,
    joinedDate: member.joinedAt,
    discriminator: member.user.discriminator
  }
  Member mem = new Member(newMember);
});

client.on('guildMemberRemove', member => {
  
});


client.on('messageDelete', message => {

});

client.on('message', message => {

  if(message.author.bot) return;
  
}); // End of message event.
