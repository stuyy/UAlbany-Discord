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
    .setAuthor("Welcome to the UAlbany Community Discord!", "https://pbs.twimg.com/profile_images/982255592222830592/09swEyNH_400x400.jpg");

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
    .setDescription("Our goal together is to build an online community for students part of the UAlbany campus to engage, socialize, and get connected with one another. We are NOT affiliated with the school, but our purpose remains to provide server members a convenient and relaxing environment to have open-ended discussions about anything.")
    .addField("With that being said, here are some important things you need to know about the community:", "\n• UAlbany students, alumni, applicants, faculty, or anyone associated with the University are welcome here. A server member does not necessarily have to be a current student or faculty member, they may have either graduated or may be looking to attend the school and needs some additional information.\n\n• The server is not restricted to one's age, ethnicity, nationality, religion, culture, sexual orientation, political views, etc.")
    .addField("Standard chat etiquette is common sense, which means we do not need to formulate a set of basic rules or guidelines for everyone to abide by. However, there are some specific manners we will not tolerate:", "\n1) Harassments - Any form of harassment towards server staff or community members. This will result in consequences that scale upon the severity of harassment.\n2) Cheating/Academic Dishonesty. The Education channels are for discussions and questions pertaining to their subjects. You may not use any of these channels to engage in any form of cheating or plagiarism. Do not bribe users to do your work for you. If you need help, you can ask your questions in the proper channel and someone will try to answer them if possible.\n3) Doxxing. Don't post private information of other students/users. Unless it has been consented by the user, the information is already displayed publicly, or it's directly from a police report, either then that, don't do it.\n4) Abusive language. There are different levels of profanity, the one we will most certainly not condone are anything **abusive** or in the form of racism, sexism, homophobic/transphobic slurs, etc. To clarify, you are permitted to swear as long as it doesn't pertain to any form of abuse or any of the categories previously listed.");
    channel.send({embed});
  }
  else {
    console.log("Error");
  }
}
