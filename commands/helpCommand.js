module.exports = {
    name: 'help',
    help: "u kiddin me? THIS IS THE HELP COMMAND JUST USE IT *internal scream*",
    execute(message, client) {
        const help = {
            title: "No"
        };
        message.channel.send({ embed: help });
    }
}