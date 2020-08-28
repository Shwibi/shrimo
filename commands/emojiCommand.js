const { execute } = require("./settingsCommand");

module.exports = {
    name: 'emoji',
    help: '<prefix>emoji [Testing]',
    async execute(message, client) {
        const { emoji } = require('../config/config.json');
        const args = message.content.split(" ");
        const name = args[1];
        if(!emoji[name]) return message.channel.send(`${emoji.x} | Could not find that emoji`);
        message.channel.send(emoji[name]);
    }
}