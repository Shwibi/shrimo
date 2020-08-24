const Discord = require('discord.js');
const fs = require('fs');
const GuildConfig = require('../models/GuildConfig');

module.exports = async (client, message) => {
    if(!message.guild) {
        if(!isNaN(message.content)) {

        }
        else {
            if(message.author.bot) return;
        const embed = {
            author: {
                name: message.author.username,
                icon_url: message.author.displayAvatarURL()
            },
            color: 0xfff,
            title: 'DMs',
            description: "Author ID: " + message.author.id,
            fields: [
                {
                    name: "Content",
                    value: message.content
                }
            ]
        }
        message.reply(
            'Which server would you like to send the message ' + message.content + ' in? You have 15 seconds, please post the guild ID of the server.'
        ).then(
            m => m.delete({ timeout: 15000 })
            
        )
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 15000 });
        collector.on('collect', async message => {
            const ID = message.content;
            if(isNaN(ID)) return message.send("Not a guild ID! Please try again...");
            const guild = client.guilds.cache.find(g => g.id == ID);
            if(!guild) return message.reply('I am not in that guild!');
            const guildMember = guild.members.cache.find(m => m.id == message.author.id);
            if(!guildMember) return message.reply("You are not in that guild!");

            const guildConfigDM = await GuildConfig.findOne({guildId: guild.id});
            const dmChannel = await guildConfigDM.get('logs');
            if(!dmChannel) return message.reply("That guild doesn't have a collection method setup! Please contact an admin/staff member of the guild to setup a DM logging system.");
            const dmChan = client.channels.cache.get(dmChannel);
            dmChan.send({ embed: embed }).then(
                message.reply(
                    " :white_check_mark: | Successfully sent the message! " + "\n" +
                    "Sent to: " + `**${guild.name}**`
                )
            );
            return;
        });
        
        }
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