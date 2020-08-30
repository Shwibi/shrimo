module.exports = {
    name: 'help',
    help: "u kiddin me? THIS IS THE HELP COMMAND JUST USE IT *internal scream*",
    async execute(message, client) {
        const GuildConfig = require('../../models/GuildConfig');
        const guildConfig = await GuildConfig.findOne({ guildId: message.guild.id });
        const prefix = guildConfig.get('prefix');
        const fs = require('fs');
        const name = message.member.displayName || message.author.username;
        const help = {
            title: "No",
            description: `No, dear ${name}`,
            color: 0xfcba03
        };
        message.channel.send({ embed: help });
        const { emoji } = require('../../config/config.json');

        setTimeout(() => {
            const em = {
                author: {
                    name: client.user.username,
                    icon_url: client.user.displayAvatarURL()
                },
                title: "Jk lol here",
                color: 0xfcba03,
                description: "The prefix for this server is `" + prefix + "`",
                fields: [
                    {
                        name: "<a:fun:748754699594891358> Fun commands",
                        value: 'eat, hug, throw, 8ball, \nboop',
                        inline: true
                    },
                    {
                        name: "<a:core:748753320885092384> Core",
                        value: 'birthday, help, settings, \nslow, suggest, invite, \nsuggestion, ticket, tickets',
                        inline: true    
                    },
                    {
                        name: emoji.mod + " Mod",
                        value: 'dm, send, mute, \nunmute, ticket closed, \npurge, dmall',
                        inline: true
                    },
                    {
                        name: `${emoji.premium} Premium`,
                        value: 'server, status',
                        inline: true
                    },
                    {
                        name: `${emoji.coin} Economy`,
                        value: `buy, shrimos, use, money`,
                        inline: true
                    },
                    {
                        name: '\u200b',
                        value: '\u200b',
                        inline: true
                    },
                    {
                        name: '\u200b',
                        value: '\u200b',
                    },
                    {
                        name: `<:Wumpi:748836768543146105> Invite Link!`,
                        value: '[»» Invite ««](http://discord.com/oauth2/authorize?client_id=746202084147331092&scope=bot&permissions=8)',
                        inline: true
                    },
                    {
                        name: `${emoji.diamond} Support server`,
                        value: '[»» Join ««](https://discord.gg/FtJ3QGc)',
                        inline: true
                    },
                    {
                        name: `${emoji.dev} Dev Server`,
                        value: `[»» Join ««](https://discord.gg/fDuhPKq)`,
                        inline: true
                    }
                ],
                footer: {
                    text: "To get help with a particular command type `" + `${prefix}command help` + "`"
                }
            };

            message.channel.send({ embed: em });
        }, 1000)
    }
}