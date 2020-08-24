const GuildConfig = require('../models/GuildConfig');


module.exports = {
    name: 'settings',
    help: '<prefix>settings <setting> <set> \nChange guild settings',
    async execute(message, client) {

        message.delete();
        if(!message.member.hasPermission('ADMINISTRATOR')) return;

        const args = message.content.toLowerCase().split(" ");

        const settings = [
            'prefix', 'welcome', 'muted', 'defaultrole', 'logs'
        ]

        const use = args[1];
        const set = args[2];

        const guildConfig = await GuildConfig.findOne({ guildId: message.guild.id });

        const prefix = guildConfig.get('prefix');
        // if(!args || !use || !set) return message.channel.send("Invalid command usage");
        
        let welcome = guildConfig.get('welcome');
        if(welcome)  welcome = `<#${guildConfig.get('welcome')}>`
        else welcome = "Not set"

        let muted = guildConfig.get('muted');
        if(muted)  muted = `<@&${guildConfig.get('muted')}>`
        else muted = "Not set"

        let def = guildConfig.get('defaultRole');
        if(def) def = `<@&${guildConfig.get('defaultRole')}>`
        else def = "Not set"

        let logs = guildConfig.get('logs');
        if(logs)  logs = `<#${guildConfig.get('logs')}>`
        else logs = "Not set"

        if(!use && !set) {
            const current = {
                title: "Current settings",
                description: "Here are the current settings for the server",
                color: 0xeb4034,
                fields: [
                    {
                        name: 'Prefix',
                        value: prefix
                    },
                    {
                        name: 'Welcome Channel',
                        value: welcome
                    },
                    {
                        name: 'Muted Role',
                        value: muted
                    },
                    {
                        name: 'Default Role (To be given when a new user joins the server)',
                        value: def
                    },
                    {
                        name: 'Logs channel',
                        value: logs
                    }
                ],
                footer: {
                    name: 'To assign/change a setting, type ' + `${prefix}settings <setting> <new value>`
                }
            };

            message.channel.send({ embed: current });
            return;
        }

        if(!settings.includes(use)) {
            return message.channel.send("No such settings present.");
        }

        // const setting = guildConfig.get(use);

        if(use == 'prefix') {
            console.log(set)
            const prefix = guildConfig.get('prefix');
            guildConfig.updateOne({
                prefix: set
            }).then(
                message.channel.send(`:white_check_mark: | Successfully updated prefix to ${set}`)
            )
        }
        else if(use == 'welcome') {
            const newSet = set.substr(2, 18);
            const search = message.guild.channels.cache.find(c => c.id == newSet);
            if(!search) return message.channel.send("No such channel found.");
            guildConfig.updateOne({
                welcome: newSet
            }).then(
                message.channel.send(`:white_check_mark: | Successfully updated welcome channel to <#${search.id}>`)
            )
        }
        else if(use == 'muted') {
            const newSet = set.substr(3, 18);
            const search = message.guild.roles.cache.find(r => r.id == newSet);
            if(!search)  return message.channel.send("No such role found.");
            // const bot = message.guild.me;
            // console.log(bot);
            // let botrole = bot.highestRole;
            // if(search.calculatedPosition > botrole.calculatedPosition) return message.channel.send('My role is below the given role, please put my role above the mentioned role.');
            guildConfig.updateOne({
                muted: newSet
            }).then(
                message.channel.send(`:white_check_mark: | Successfully updated muted role to <@&${search.id}>`)
            )
        }
        else if(use == 'defaultrole') {
            const newSet = set.substr(3, 18);
            const search = message.guild.roles.cache.find(r => r.id == newSet);
            if(!search)  return message.channel.send("No such role found.");
            // const bot = message.guild.members.cache.find(u => u.id == client.user.id);
            // let botrole = bot.highestRole;
            // if(search.calculatedPosition > botrole.calculatedPosition) return message.channel.send('My role is below the given role, please put my role above the mentioned role.');
            guildConfig.updateOne({
                defaultRole: newSet
            }).then(
                message.channel.send(`:white_check_mark: | Successfully updated default role to <@&${search.id}>`)
            )
        }
        else if(use == 'logs') {
            const newSet = set.substr(2, 18);
            const search = message.guild.channels.cache.find(c => c.id == newSet);
            if(!search) return message.channel.send("No such channel found.");
            guildConfig.updateOne({
                logs: newSet
            }).then(
                message.channel.send(`:white_check_mark: | Successfully updated logs channel to <#${search.id}>`)
            )
        }



    }
}