module.exports = {
    name: 'send',
    help: 's?send #channel \nSends a message to a channel in the server',
    description: 'Send messages to channels!',
    execute(message, client) {
        message.delete();
        if(!message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.send("<a:no:748782299667234966> | No permissions! You have no permissions!");
            return;
        }
        const channel = message.mentions.channels.first() || message.content.split(" ")[1].substr(2, 18);
        if(!channel) return message.channel.send("<a:no:748782299667234966> | Mention a channel");
        const searchChannel = message.guild.channels.cache.find(ch => ch.id == channel.id);
        if(!searchChannel) return message.channel.send("<a:no:748782299667234966> | No channel found in server...");

        const args = message.content.split(" ");
        const msg = args.slice(2).join(" ");
        searchChannel.send(msg);
        message.member.send(msg);
        const d = new Date();
        message.member.send("Sent this message in " + searchChannel.name + " at " + d);
    }
}