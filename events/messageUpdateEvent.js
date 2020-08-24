const messageDeleteEvent = require('./messageDeleteEvent');

module.exports = async (client, oldMessage, newMessage) => {
    if(!oldMessage.guild) return;
    const GuildConfig = require('../models/GuildConfig');
    const guildConfig = await GuildConfig.findOne({ guildId: oldMessage.guild.id });
    const logs = await guildConfig.get('logs');
    if(!logs) return;
    const logChannel = oldMessage.guild.channels.cache.find(c => c.id == logs);
    if(!logChannel) return;

    if(oldMessage.content == newMessage.content) return;

    const embed = {
        author: {
            name: oldMessage.author.tag,
            icon_url: oldMessage.author.displayAvatarURL()
        },
        title: "Message updated",
        description: 'Message update in ' + `<#${oldMessage.channel.id}>`,
        color: 0x1bdb0d,
        fields: [
            {
                name: "Old Message",
                value: oldMessage.content
            },
            {
                name: "New Message",
                value: newMessage.content
            },
            {
                name: "Author ID",
                value: oldMessage.author.id
            }
        ]
    };

    logChannel.send({ embed: embed });

}