const { emoji } = require('../../config/config.json');
module.exports = {
    name: 'server',
    help: '<prefix>server \nKnow about this server \n**PREMIUM COMMAND**' + emoji.premium,
    async execute(message, client) {
        const PremiumUsers = require('../../models/PremiumUsers');
        const premiumUser = await PremiumUsers.findOne({ userId: message.author.id });
        if(!premiumUser) return message.channel.send(`${emoji.x} | You are not a premium user.`);
        const embed = {
            author: {
                name: message.guild.name,
                icon_url: message.guild.iconURL()
            },
            title: `${emoji.info} Guild info`,
            description: `Guild ID: ${message.guild.id}`,
            color: 0x6d32a8,
            fields: [
                {
                    name: "Guild Members",
                    value: message.guild.members.cache.filter(m => !m.user.bot).size,
                    inline: true
                },
                {
                    name: "Bots",
                    value: message.guild.members.cache.filter(m => m.user.bot).size,
                    inline: true
                },
                {
                    name: "------------------------",
                    value: "------------------------"
                },
                {
                    name: "Guild roles",
                    value: message.guild.roles.cache.size ,
                    inline: true
                },
                {
                    name: "Guild Channels",
                    value: message.guild.channels.cache.size,
                    inline: true
                },
                {
                    name: "AFK Channel",
                    value: message.guild.afkChannel || "None",
                    inline: true
                },
                {
                    name: "Boosts",
                    value: message.guild.premiumSubscriptionCount || "None",
                    inline: true
                },
                {
                    name: "Region",
                    value: message.guild.region,
                    inline: true
                },
                {
                    name: "Guild Owner",
                    value: `<@${message.guild.ownerID}>`
                },
                {
                    name: "Created on",
                    value: message.guild.createdAt
                },
                {
                    name: "Emojis",
                    value: message.guild.emojis.cache.size
                }
            ]
        };
        message.channel.send({ embed: embed });
    }
}