module.exports = async (client, messages) => {
    console.log(messages);
    const GuildConfig = require('../models/GuildConfig');
    const reply = "DELETED MESSAGES: \n";
    messages.forEach(async message => {
        var guild = message.guild;
        const guildConfig = await GuildConfig.findOne({ guildId: guild.id });
        const logs = guildConfig.get('logs');
        if(!logs) return;
        reply += message.content + "\n";
    })
    console.log(reply);

    
}