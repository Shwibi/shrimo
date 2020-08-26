module.exports = {
    name: 'help',
    help: "u kiddin me? THIS IS THE HELP COMMAND JUST USE IT *internal scream*",
    async execute(message, client) {
        const GuildConfig = require('../models/GuildConfig');
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
                        name: ":balloon: Fun commands",
                        value: 'eat, hug, throw, 8ball',
                        inline: true
                    },
                    {
                        name: ":brain: Core",
                        value: 'birthday, help, settings, \nslow, suggest, invite, suggestion, \nticket',
                        inline: true
                    },
                    {
                        name: ":wrench: Mod",
                        value: 'dm, send, mute, \nunmute',
                        inline: true
                    },
                    {
                        name: '\u200b',
                        value: '\u200b'
                    },
                    {
                        name: `Invite Link!`,
                        value: '[Invite](http://discord.com/oauth2/authorize?client_id=746202084147331092&scope=bot&permissions=8)',
                        inline: true
                    },
                    {
                        name: `Support server`,
                        value: '[Join](https://discord.gg/FtJ3QGc)',
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