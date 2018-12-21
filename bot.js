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
  let util = new BotCommands();
  util.add(member);
  // Print welcome message.
  
  var welcomeChannel = member.guild.channels.find(channel => channel.name === 'welcome');

  try {
    welcomeChannel.send("Welcome to the server " + member.user + "!");
  }
  catch(ex)
  {
    console.log(ex);
  }
});

/**
 * Deletion of Member successful.
 */
client.on('guildMemberRemove', member => {
  let util = new BotCommands();
  util.setUserAvailability(member);
});

client.on('messageDelete', message => {

});

client.on('message', async message => {

  const command = new BotCommands();

  if(message.author.bot) return;

  // First Check if the User is in the Database.
  let guildMember = message.member;
  let result = await command.isInDatabase(guildMember);
  if(result)
    command.handleCommand(message);
  else {
    await command.add(guildMember);
    command.handleCommand(message);
  }

}); // End of message event.
