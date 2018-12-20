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
  console.log("New member arrived.");
  var newMember = {
    username: member.user.username,
    clientID: member.id,
    joinedDate: member.joinedAt,
    discriminator: member.user.discriminator
  }
  var newGuildMember = new Member(newMember);
  newGuildMember.save()
  .then(member => {
    console.log("Member Saved to DB.");
    console.log(member);
  })
  .catch(err => console.log(err));
});

client.on('guildMemberRemove', member => {
  
});


client.on('messageDelete', message => {

});

client.on('message', message => {

  if(message.author.bot) return;
  
}); // End of message event.
