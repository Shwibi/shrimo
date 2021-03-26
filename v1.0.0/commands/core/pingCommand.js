module.exports = {
    name: 'ping',
    help: '<prefix>ping \nCheck the ping of the bot',
    async execute(message, client) {
        const ping = (new Date().getTime() - message.createdTimestamp);
        let embed = {
            author: {
                 name: client.user.username,
                icon_url: client.user.displayAvatarURL()
            },
            title: "Ping",
            description: ping + " ms",
            color: 0xffbf00
        };
        message.channel.send({ embed: embed });
    }
}