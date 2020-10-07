module.exports = {
    name: 'invite',
    help: '<prefix>invite \nGets the invite link for the bot! Thanks!',
    async execute(message, client) {
        const { emoji, theme } = require('../../config/config.json');

        const themes = require('../../config/themes.json');
        const indexLine = Math.floor(Math.random() * themes[theme].lines.length);

        const embed = {
            author: {
                name: client.user.username,
                icon_url: client.user.displayAvatarURL({ dynamic: true })
            },
            title: "Thanks! | " + themes[theme].lines[indexLine],
            description: "Here's the invite link!",
            color: themes[theme].color.json,
            fields: [
                {
                    name: `<:Wumpi:748836768543146105> Invite me to your server!`,
                    value: '[»» Invite ««](http://discord.com/oauth2/authorize?client_id=746202084147331092&scope=bot&permissions=8)',

                },
                {
                    name: `${emoji.diamond} Support server`,
                    value: '[»» Join ««](https://discord.gg/FtJ3QGc)'
                },
                {
                    name: `${emoji.dev} Dev Server`,
                    value: `[»» Join ««](https://discord.gg/fDuhPKq)`
                }
            ],
            footer: {
                text: themes[theme].description
            }
        };

        message.channel.send({ embed: embed });
    }
}