const Discord = require('discord.js');
const fs = require('fs');

module.exports = async (client, message) => {
    client.commands = new Discord.Collection();
    const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('Command.js'));
    for(const file of commandFiles) {
        const command = require(`../commands/${file}`);
        client.commands.set(command.name, command);
    };

    const config = require('../config/config.json');
    const prefix = config.BOT.PREFIX;

    const args = message.content.toLowerCase().split(" ");
    if(!args[0].startsWith(prefix)) return;
    const cmd = args[0].slice(prefix.length);
    if(cmd) {
        if(!client.commands.get(cmd)) return;
        if(args[1] == 'help') {
            if(!client.commands.get(cmd).help) return message.channel.send("No help command for that module found.");
            message.channel.send(client.commands.get(cmd).help);
            return;
        }
        client.commands.get(cmd).execute(message, client);
    }
}