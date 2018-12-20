const Discord = require('discord.js');
const client = new Discord.Client();
const CONFIG = require('./config.json');
const Member = require('./models/member');
const { BotCommands } = require('./utilities/commands');

client.login(CONFIG.token);

client.on("ready", () => {

  console.log("Logged in successfully!");
  client.user.setActivity('to Anson\'s Podcast', {type: 'Listening'});

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
  // After saving the user to the Database, apply them the Great Dane role.
});

/**
 * Deletion of Member successful.
 */
client.on('guildMemberRemove', member => {
  Member.deleteOne({ clientID: member.id })
  .then(member => {
    console.log("Member deleted successfully");
    console.log(member);
  })
  .catch(err => console.log(err));
});

client.on('messageDelete', message => {

});

client.on('message', message => {

  const commandUtility = new BotCommands();
  if(message.author.bot) return;
  // First Check if the User is in the Database.
  let guildMember = message.member;
  let flag = commandUtility.isInDatabase(guildMember, Member);
}); // End of message event.
