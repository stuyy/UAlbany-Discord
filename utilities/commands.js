const Member = require('../models/member');

class BotCommands {

    async isInDatabase(guildMember)
    {
        console.log(guildMember);
        const member = await Member.findOne({ clientID: guildMember.id });
        console.log(member);
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
        var member = await Member.findOne({ clientID: guildMember.id });

        var status = !member.available;
        console.log(status);
        Member.findOneAndUpdate({ clientID: guildMember.id }, { available:  status})
        .then(member => console.log("Member left. Changed availability to " + member.available))
        .catch(err => console.log(err));
    }
}


module.exports = { BotCommands };