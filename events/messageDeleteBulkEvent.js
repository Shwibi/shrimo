module.exports = async (client, messages) => {
    // console.log(messages);
    const GuildConfig = require('../models/GuildConfig');
    let reply = [];
    console.log(messages.size);
    let x = 0;
    messages.forEach(async message => {
        
        // channel.send(
        //     `__===========Message deleted===========__ \n` +
        //     `**User:** ${message.author.tag} \n` +
        //     `**Channel:** <#${message.channel.id}> \n` +
        //     `**Content:** \n${message.content} \n` + 
        //     `__===========Message deleted===========__`
        // );
        reply.push(message.content);
        console.log(reply);
        const mes = reply.join("\n");
        console.log(mes);
        var guild = message.guild;
        const guildConfig = await GuildConfig.findOne({ guildId: guild.id });
        const logs = guildConfig.get('logs');
        if(!logs) return;
        const channel = message.guild.channels.cache.find(ch => ch.id == logs);
        // return channel;
        x++;
        if(x == (messages.size)) {
            const embed = {
                author: {
                    name: message.author.tag,
                    icon_url: message.author.displayAvatarURL()
                },
                title: "Message bulk deleted",
                description: "Author ID: " + message.author.id,
                fields: [
                    {
                        name: "Deleted messages",
                        value: mes
                    },
                    {
                        name: "Channel",
                        value: `<#${message.channel.id}>`
                    }
                ]
            }
            channel.send({ embed: embed });
        }
    })
    
    
    

    

    
}