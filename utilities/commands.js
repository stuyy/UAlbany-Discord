const Member = require('../models/member');
const EventEmitter = require('events');
const Discord = require('discord.js');

class BotCommands {

    async isInDatabase(guildMember)
    {
        const member = await Member.findOne({ clientID: guildMember.id });
        return member;
    }

    async add(guildMember)
    {
        var exists = await this.isInDatabase(guildMember);

        if(exists)
        {
            this.setUserAvailability(guildMember)
            .then(member => console.log("OK"))
            .catch(err => console.log(err));
        }
        else {
            let newMember = {
                username: guildMember.user.username,
                clientID: guildMember.id,
                joinedDate: guildMember.joinedAt,
                discriminator: guildMember.user.discriminator,
                available: true
            }
    
            var newGuildMember = new Member(newMember);
            newGuildMember.save()
            .then(member => console.log("Saved " + member.username + "#" + member.discriminator + " to the Database."))
            .catch(err => console.log(err));
        }
    }

    async setUserAvailability(guildMember)
    {
        try {
            var member = await Member.findOne({ clientID: guildMember.id });

            var status = !member.available;
            var updateMember = await Member.findOneAndUpdate({ clientID: guildMember.id }, { available:  status});
        }
        catch(ex)
        {
            console.log(ex);
        }
    }
    handleCommand(message)
    {
        if(message.content.startsWith("?")) // Check if the message is a command.
        {
            if(this.isCommand(message.content, "help"))
            {
                const embed = new Discord.RichEmbed();
                embed.setTitle("Help Directory");
                embed.setDescription("**?help** - Lists all of the available commands from Dane Bot\n" +
                "**?add** - Assigns user to the role(s) specified. e.g: ?addrole Computer Science/Mathematics\n" +
                "**?remove** - Removes the user from the specified role(s)\n" + 
                "**?view** - Display information about a user provided by their Discord Client ID\n" +
                "**?play** - Plays a YouTube stream provided by its URL in the Music Voice Channel\n" +
                "**?weather** - Gets the current weather status provided by a city name\n");
                message.channel.send(embed);
                
            }
            else if(this.isCommand(message.content, "roles"))
                message.channel.send("Roles");
            else if(this.isCommand(message.content, "add"));
            else if(this.isCommand(message.content, "remove"));
            else if(this.isCommand(message.content, "ban"));
            else if(this.isCommand(message.content, "kick"));
            else if(this.isCommand(message.content, "mute"));
            else {
                const embed = new Discord.RichEmbed()
                .setDescription("Command Not Found");
                message.channel.send(embed);
            }
        }
        else {
            // Not a command. User sent a normal message.
        }
    }
    
    isCommand(message, command)
    {
        return message.toLowerCase().startsWith("?" +  command);
    }
}

module.exports = { BotCommands };