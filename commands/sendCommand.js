module.exports = {
    name: 'send',
    help: 's?send #channel \nSends a message to a channel in the server',
    execute(message, client) {
        message.delete();
        if(!message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.send("No permissions! You have no permissions!");
            return;
        }
        const channel = message.mentions.channels.first() || message.content.split(" ")[1].substr(2, 18);
        if(!channel) return message.channel.send("Mention a channel");
        const searchChannel = message.guild.channels.cache.find(ch => ch.id == channel.id);
        if(!searchChannel) return message.channel.send("No channel found in server...");

        const args = message.content.split(" ");
        const msg = args.slice(2).join(" ");
        searchChannel.send(msg);
        message.member.send(msg);
        const d = new Date();
        message.member.send("Sent this message in " + searchChannel.name + " at " + d);
    }
}