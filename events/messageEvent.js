const Discord = require('discord.js');
const fs = require('fs');
const GuildConfig = require('../models/GuildConfig');

module.exports = async (client, message) => {
    if(!message.guild) {
        if(message.author.bot) return;
        const embed = {
            author: {
                name: message.author.username,
                icon_url: message.author.displayAvatarURL()
            },
            color: 0xfff,
            title: 'DMs',
            descritpion: "Author ID: " + message.author.id,
            fields: [
                {
                    name: "Content",
                    value: message.content
                }
            ]
        }
        const dm_ch = client.channels.cache.get('746934028560498740');
        dm_ch.send({ embed: embed });
        return;
    }
    if(message.channel.id == '746217071620128879') message.delete();
    client.commands = new Discord.Collection();
    const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('Command.js'));
    for(const file of commandFiles) {
        const command = require(`../commands/${file}`);
        client.commands.set(command.name, command);
    };

    const config = require('../config/config.json');
    const guildConfig = await GuildConfig.findOne({ guildId: message.guild.id });
    const prefix = guildConfig.get('prefix');

    const args = message.content.toLowerCase().split(" ");
    if(!args[0].startsWith(prefix)) return;
    const cmd = args[0].slice(prefix.length);
    if(!cmd) return;
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