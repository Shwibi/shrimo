const GuildConfig = require('../models/GuildConfig');

module.exports = (client, message) => {

    const guildConfig = GuildConfig.findOne({ guildId: message.guild.id });
    const logs = guildConfig.get('logs');
    if(!logs) return;
    const logChannel = message.guild.channels.cache.find(ch => ch.id == logs);
    const d = new Date();

    const embed = {
        author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
        },
        title: 'Message Deleted',
        description: 'Author ID: ' + message.author.id,
        fields: [
            {
                name: "Content:",
                value: message.content
            },
            {
                name: "Channel:",
                value: `<#${message.channel.id}>`
            },
            {
                name: "Date:",
                value: d
            },
            {
                name: "Highest role:",
                value: message.member.highestRole
            }
        ]
    };

    logChannel.send({ embed: embed });

}