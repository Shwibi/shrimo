module.exports = {
    name: 'invite',
    help: '<prefix>invite \nGets the invite link for the bot! Thanks!',
    async execute(message, client) {
        const { emoji } = require('../../config/config.json');
        const embed = {
            author: {
                name: client.user.username,
                icon_url: client.user.displayAvatarURL( { dynamic: true } )
            },
            title: "Thanks!",
            description: "Here's the invite link!",
            color: 0xfcba03,
            fields: [
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
            ]
        };

        message.channel.send({ embed: embed });
    }
}