const GuildConfig = require('../models/GuildConfig');

module.exports = async (client, message) => {

    const guildConfig = await GuildConfig.findOne({ guildId: message.guild.id });
    // console.log(guildConfig);
    let logs = await guildConfig.get('logs');
    // console.log(logs);
    if(!logs) return;
    const logChannel = message.guild.channels.cache.find(ch => ch.id == logs);
    const d = new Date();
    if(!message.content) return;

    const embed = {
        author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
        },
        color: 0xdb0d0d,
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
                value: message.member.roles.highest
            }
        ]
    };

    logChannel.send({ embed: embed });

}