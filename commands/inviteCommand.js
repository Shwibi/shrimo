const { execute } = require("./suggestCommand");

module.exports = {
    name: 'invite',
    help: '<prefix>invite \nGets the invite link for the bot! Thanks!',
    async execute(message, client) {
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
                    name: "Invite The Bot",
                    value: '[Invite](https://discord.com/oauth2/authorize?client_id=746202084147331092&scope=bot&permissions=8)',
                    inline: true
                },
                {
                    name: "Support Server",
                    value: '[Join](https://discord.gg/FtJ3QGc)',
                    inline: true
                }
            ]
        };

        message.channel.send({ embed: embed });
    }
}