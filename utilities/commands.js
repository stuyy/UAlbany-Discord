const Member = require('../models/member');

class BotCommands {

    async isInDatabase(guildMember)
    {
        console.log(guildMember);
        const member = await Member.findOne({ clientID: guildMember.id });
        if(member == null) 
        {
            
        }
        else 
            return true;
    }

    add(guildMember)
    {
        let newMember = {
            username: guildMember.user.username,
            clientID: guildMember.id,
            joinedDate: guildMember.joinedAt,
            discriminator: guildMember.user.discriminator
        }

        var newGuildMember = new Member(newMember);
        newGuildMember.save()
        .then(member => console.log("Saved " + member.username + "#" + member.discriminator + " to the Database."))
        .catch(err => console.log(err));
    }
    delete(guildMember)
    {
        Member.deleteOne({ clientID: guildMember.id })
        .then(member => {
            console.log("Removed.");
            console.log(member);
        }).catch(err => console.log(err));
    }
}


module.exports = { BotCommands };