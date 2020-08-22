module.exports = {
    name: 'help',
    help: "u kiddin me? THIS IS THE HELP COMMAND JUST USE IT *internal scream*",
    execute(message, client) {
        const name = message.member.displayName || message.author.username;
        const help = {
            title: "No",
            description: `No, dear ${name}`,
            color: 0xfcba03
        };
        message.channel.send({ embed: help });
    }
}