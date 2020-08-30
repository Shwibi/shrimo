
module.exports = {
    name: 'purge',
    help: '<prefix>purge <number> \nDelete a specific number of messages',
    async execute(message, client) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return;
        const args = message.content.split(" ");
        if(!args[1]) return message.channel.send(" <a:no:748782299667234966> | Please mention amount of messages to purge.");
        if(!isNaN(args[1]) && args[1] <= 100 && args[1] >= 2) {
            const number = parseInt(args[1]) + 1;
            // console.log(number);
            message.channel.messages.fetch().then(
                message.channel.bulkDelete(number).then(
                    message.channel.send(" :white_check_mark: | Successfully deleted " + args[1] + " messages.").then(
                        m => m.delete({ timeout: 5000 })
                    )
                )
            )
        } else {
            message.channel.send(" <a:no:748782299667234966> | Please mention a number between 2-100 to purge! Note that I can't delete messages which were made before 14 days due to discord limitations on deleting messages.");

        }
    }
}