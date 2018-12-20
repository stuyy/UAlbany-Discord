class BotCommands {

    async isInDatabase(guildMember, memberModel)
    {
        const member = await memberModel.findOne({ clientID: guildMember.id });
        try {
            if(member)
                return true;
            else
                throw new Error("Member not in Database.");
        }
        catch(ex)
        {
            console.log(ex);
        }
    }
}

module.exports = { BotCommands };