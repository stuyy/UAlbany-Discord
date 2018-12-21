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
  var memberLogChannel = member.guild.channels.find(chan => chan.name === 'member-log');
  var introductionChannel = member.guild.channels.find(chan => chan.name === 'introductions');
  var botChannel = member.guild.channels.find(chan => chan.name === 'bot');

  try {
    welcomeChannel.send("Welcome to the server " + member.user + "! Introduce yourself over at the " + introductionChannel + " channel and assign yourself to a role in the " + botChannel + " channel.");
    
  }
  catch(ex)
  {
    console.log(ex);
  }
  finally {
    let authorName = member.user.username + "#" + member.user.discriminator + " <" + member.id +">";
    const embed = new Discord.RichEmbed()
    .setAuthor(authorName, member.user.displayAvatarURL)
    .setFooter("User joined")
    .setColor("#41a9f4");
    memberLogChannel.send({embed});
  }
});

/**
 * Deletion of Member successful.
 */
client.on('guildMemberRemove', member => {
  let util = new BotCommands();
  util.setUserAvailability(member);
  var memberLogChannel = member.guild.channels.find(chan => chan.name === 'member-log');
  let authorName = member.user.username + "#" + member.user.discriminator + " <" + member.id + ">";
  const embed = new Discord.RichEmbed()
    .setAuthor(authorName, member.user.displayAvatarURL)
    .setFooter("User left")
    .setColor("#f44141");
    memberLogChannel.send(embed);
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

client.on('messageDelete', message => {

  if(message.author.bot) return;
  let serverLogChannel = message.guild.channels.find(ch => ch.name === 'server-log');
  const embed = new Discord.RichEmbed();
  embed.setAuthor(message.author.username, message.author.displayAvatarURL);
  embed.setDescription("**Message Deleted** - " + message.content);
  embed.setColor("#f49e42")
  serverLogChannel.send(embed);

});


