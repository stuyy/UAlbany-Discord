const maps = require('./ualbany_maps.json');
const Discord = require('discord.js');
const Guild = new Discord.Guild();

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
        let m = args[i];
        console.log(m);
        while(k<maps[m].length)
        {
          console.log("Major: " + maps[m][k].major + "\nDegree: " + maps[m][k].degree + "\nMap: ");
          message.channel.send("Major: " + maps[m][k].major + "\nDegree: " + maps[m][k].degree, {files: [ maps[m][k].map ]});
          k++;
        }
      }
      i++;
    }
  }
}

exports.showHours = function showHours(message)
{
  let args = message.content.toLowerCase().split(" ");
  if(args[1] === 'dh')
  {
    const embed = new Discord.RichEmbed()
      .setTitle("UAlbany Dining Hall Hours of Operation")
      .setColor(6881105)
      .setImage('https://raw.githubusercontent.com/ansonfoong/UAlbany-Discord/master/ua-hours/dining-hall.png');

    message.channel.send({embed});
  }
  else if(args[1] === 'cc')
  {
    const embed = new Discord.RichEmbed()
      .setTitle("UAlbany Campus Center Hours of Operation")
      .setColor(6881105)
      .setImage('https://raw.githubusercontent.com/ansonfoong/UAlbany-Discord/master/ua-hours/campus-center.png');

    message.channel.send({embed});
  }
  else
  {
    const embed = new Discord.RichEmbed()
    .setTitle("Hours")
    .setColor(6881105)
    .addField("UAlbany ID Card Office", "Monday - Friday: 8:30am - 4:30pm")
    .addField("University Bookstore (August 27th to September 2nd)", "Monday - Thursday: 9am - 8pm\nFriday: 9am - 6pm\nSaturday: 11am - 5pm\nSunday: CLOSED\n");
    message.channel.send({embed});
  }

}

exports.showIntro = function(message)
{
  let channel = message.guild.channels.find(channel => channel.id === '487000554858610710');
  if(channel != null)
  {
    const embed = new Discord.RichEmbed()
    .setImage("https://cdn.discordapp.com/attachments/487000554858610710/489679451760754688/we2.png")
    .setAuthor("Welcome to the UAlbany Community Discord!", "https://pbs.twimg.com/profile_images/982255592222830592/09swEyNH_400x400.jpg")
    .setColor("#46166b");

    channel.send({embed});
  }
  else {
    console.log("Error");
  }
}

exports.showRules = function(message)
{
  let channel = message.guild.channels.find(channel => channel.id === '487000554858610710');
  if(channel != null)
  {
    const embed = new Discord.RichEmbed()
    .setTitle("")
    .setAuthor("Our Mission", "https://pbs.twimg.com/profile_images/982255592222830592/09swEyNH_400x400.jpg")
    .setDescription("Our goal together is to build an online community for students part of the UAlbany campus to engage, socialize, and get connected with one another. We are NOT affiliated with the school, but our purpose remains to provide server members a convenient and relaxing environment to have open-ended discussions about anything.")
    .addField("With that being said, here are some important things you need to know about the community:", "\n• UAlbany students, alumni, applicants, faculty, or anyone associated with the University are welcome here. A server member does not necessarily have to be a current student or faculty member, they may have either graduated or may be looking to attend the school and needs some additional information.\n\n• The server is not restricted to one's age, ethnicity, nationality, religion, culture, sexual orientation, political views, etc.\n")
    .addField("Standard chat etiquette is common sense!", "Which means we do not need to formulate a set of basic rules or guidelines for everyone to abide by. However, there are specific manners we will not tolerate:\n")
    .addField("Harassment", "\nAny form of harassment towards server staff or community members is strictly prohibited. This will result in consequences that scale upon the severity of harassment.\n")
    .addField("Cheating/Academic Dishonesty/Bribery", "The Education channels are for discussions and questions pertaining to their subjects. You may not use any of these channels to engage in any form of cheating or plagiarism. Do not bribe users to do your work for you. If you need help, you can ask your questions in the proper channel and someone will try to answer them if possible.\n")
    .addField("Doxxing", "Don't post **private information** of other students/users. Unless it has been consented by the user, the information is already displayed publicly, or it's **directly** from a police report, either then that, don't do it.\n")
    .addField("Abusive language", "There are different levels of profanity, the one we will most certainly not condone are anything **abusive** or in the form of racism, sexism, homophobic/transphobic slurs, etc. To clarify, you are permitted to swear as long as it doesn't pertain to any form of abuse or any of the categories previously listed.\n")
    .addField("Self-Advertisements", "Unless you are promoting a school event, club, charity, etc, any form of advertising on server channels with the intent of self-gain, or unrelated to the school are prohibited. If you are unsure about this, please contact a Moderator.\n")
    .setFooter("If you have any questions about these standard guidelines, contact the Administrators.")
    .setColor("#eeb211");
    channel.send({embed});
  }
  else {
    console.log("Error");
  }
}

exports.showRoleInfo = function showRoleInfo(message)
{
  let channel = message.guild.channels.find(channel => channel.id === '487000554858610710');
  if(channel != null)
  {
    let admin = message.guild.roles.find(role => role.name === 'Administrator');
    let mod = message.guild.roles.find(role => role.name === 'Moderator');
    let bot = message.guild.roles.find(role => role.name === 'Bot');
    let dane = message.guild.roles.find(role => role.name === 'Great Dane');
    let alumni = message.guild.roles.find(role => role.name === 'Alumni');
    let honors = message.guild.roles.find(role => role.name === 'Honors College');
    let botChannel = message.guild.channels.find(c => c.name === 'bot');
    const embed = new Discord.RichEmbed()
    .setTitle("")
    .setAuthor("Server Roles", "https://pbs.twimg.com/profile_images/982255592222830592/09swEyNH_400x400.jpg")
    .setDescription("Roles are a way to identify yourself on the server. There are Self-Assignable roles, and Special roles.")
    .addField("Special Roles", admin + " and " + mod + " roles are self explanatory. They are server staff that ensure server members and channels are safe and clean up any unncesessary posts, irrelevant to the channel or anything malicious.\n\n" + bot + " are server Bots. They provide commands in which returns some result. For more information, type !help in the #bot channel.\n\n" + dane + " is the default role every user is assigned to upon joining.\n\n" + alumni + " are for former students that have graduated.\n\n" + honors + " are for students admitted to the Honors College at UAlbany.\n")
    .addBlankField()
    .addField("Self-Assignable Roles", "Roles pertaining to **academic standing** (new student or transfer), **major-specific roles** (e.g: Biology), and **Gaming Roles** (Overwatch) can all be self-assigned via command in the " + botChannel + " channel. To assign yourself to a role, first type !roles to bring up a list of keywords that map to the role you want. Then specify which roles you want **(e.g: !addrole cs math phys senior)** will add you to the Computer Science, Math, Physics, and Senior roles. You can also remove yourself from the role by typing in **!deleterole [list of keywords]**")
    .setColor("#eeb211");

    channel.send({embed});

  }
}

exports.showChannelInfo = function showChannelInfo(message)
{
  let channel = message.guild.channels.find(channel => channel.id === '487000554858610710');
  let general = message.guild.channels.find(channel => channel.id === '298219088356966402');
  let offtopic = message.guild.channels.find(channel => channel.id === '488968752608706561');
  let csChannel = message.guild.channels.find(channel => channel.id === '359149010251939840');
  let mathChannel = message.guild.channels.find(channel => channel.id === '359148877611532299');
  let botChannel = message.guild.channels.find(channel => channel.id === '475047695107751966');
  if(channel != null)
  {

    const embed = new Discord.RichEmbed()
    .setTitle("")
    .setAuthor("Server Channels", "https://pbs.twimg.com/profile_images/982255592222830592/09swEyNH_400x400.jpg")
    .setDescription("Channels are organized sections of the server that have different topics for each one. To enter a channel, simply select it on the left side of the application.")
    .addField("General Channels", "The main " + general + " channel is for everyone to discuss open-endedly about anything. It should be mentioned that any memes or irrelevant attachments should be posted in " + offtopic + " *unless* it pertains to the current discussion. We are not heavily-opinionated on this, but please do not abuse the channel by posting 20 attachments in a row.")
    .addField("Education Channels", "There are several channels that pertain to popular academic subjects, e.g: " + csChannel + " " + mathChannel + ". We may create additional channels for subjects demanding on the demand. These channels are intended for educational purposes.")
    .addField("Bot Channels", "Bot channel gives users access to all the bot commands. Each command returns a result. For more information, type !help in the " + botChannel + " channel.")
    .addField("Other Channels", "Off-Topic and Gaming Channels are self-explanatory. Private channels are also available for each class. To get added to it, you must request it by direct messaging one of the server staff members.")
    .setColor("#eeb211");

    channel.send({embed});

  }
}


exports.showInvite = function(message)
{
  let channel = message.guild.channels.find(channel => channel.id === '487000554858610710');
  if(channel != null)
  {
    const embed = new Discord.RichEmbed()
    .setTitle("Instant Invite Link")
    .setAuthor("Instant Invite Link", "https://pbs.twimg.com/profile_images/982255592222830592/09swEyNH_400x400.jpg")
    .setDescription("You can now invite people by forwarding them this link. Note that they must access it via their browser to be directed to the server and cannot paste the link in the Discord client.")
    .setImage("https://cdn.discordapp.com/attachments/487000554858610710/489759176717893642/invite2.png")
    .setColor("#eeb211")
    .setURL("http://uadiscord.me");
    channel.send({embed});
  }
}

exports.showFooter = function(message)
{
  let channel = message.guild.channels.find(channel => channel.id === '487000554858610710');
  if(channel != null)
  {
    const embed = new Discord.RichEmbed()
    .setFooter("Server feedback is always appreciated! We're constantly looking for ways to improve the quality and functionality of the server to provide everyone a place to feel welcomed. Please don't hesitate to message a Moderator to voice your concerns, we love hearing from you guys and hope you enjoy your stay.")
    .setColor("#46166b");
    channel.send({embed});
  }
}
