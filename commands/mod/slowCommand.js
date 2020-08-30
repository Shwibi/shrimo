module.exports = {
    name: 'slow',
    help: '<prefix>slow <number in seconds> \nSet slowmode in a channel to a particular number',
    async execute(message, client) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return;
        const args = message.content.split(" ");
        let time = args[1];
        if(isNaN(time)) {
            message.channel.send("<a:no:748782299667234966> | Please use a number for a slowmo!");
            return;
        }
        message.channel.setRateLimitPerUser(time).then(
            message.channel.send(" :white_check_mark: | Set slow mode for this channel to " + args[1] + " seconds.")
        )
    }
}