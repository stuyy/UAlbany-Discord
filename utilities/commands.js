const Member = require('../models/member');
const EventEmitter = require('events');

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
        if(this.isCommand(message.content, "help"))
            message.channel.send("Help Info");
            
    }

    isCommand(message, command)
    {
        return message.toLowerCase().startsWith("?" +  command);
    }
}

module.exports = { BotCommands };