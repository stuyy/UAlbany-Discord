const Discord = require('discord.js');
const client = new Discord.Client();
const CONFIG = require('./config.json');
const { BotCommands } = require('./utilities/commands');

client.login(CONFIG.token);

client.on("ready", () => {

  console.log("Logged in successfully!");
  client.user.setActivity('to Anson\'s Podcast', {type: 'Listening'});

});

client.on('error', console.error); 

client.on('guildMemberAdd', member => {
  console.log("New member arrived.");
  let commandUtility = new BotCommands();
  commandUtility.add(member);
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

client.on('message', async message => {

  const commandUtility = new BotCommands();
  if(message.author.bot) return;

  // First Check if the User is in the Database.
  let guildMember = message.member;
  await commandUtility.isInDatabase(guildMember);

}); // End of message event.
