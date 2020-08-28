const GuildConfig = require('../models/GuildConfig');


module.exports = {
    name: 'settings',
    help: '<prefix>settings <setting> <set> \nChange guild settings',
    async execute(message, client) {

        message.delete();
        if(!message.member.hasPermission('ADMINISTRATOR')) return;

        const args = message.content.toLowerCase().split(" ");

        const settings = [
            'prefix', 'welcome', 'muted', 'defaultrole', 'logs', 'verify', 'underage', 'ticket', 'ticketlogs'
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

        let verify = guildConfig.get('verify');
        if(verify) verify = `<#${guildConfig.get('verify')}>`
        else verify = "Not set"

        let underage = guildConfig.get('underage');
        if(underage) underage = `<@&${underage}>`
        else underage = "Not set"

        let ticket = guildConfig.get('ticket_channel');
        if(ticket) ticket = `<#${ticket}>`
        else ticket = "Not set"

        let ticketLogs = guildConfig.get('ticket_logs');
        if(ticketLogs) ticketLogs = `<#${ticketLogs}>`
        else ticketLogs = "Not set"

        if(!use && !set) {
            const current = {
                title: "Current settings",
                description: "Here are the current settings for the server",
                color: 0xeb4034,
                fields: [
                    {
                        name: 'Prefix <prefix>',
                        value: prefix
                    },
                    {
                        name: 'Welcome Channel <welcome>',
                        value: welcome
                    },
                    {
                        name: 'Muted Role <muted>',
                        value: muted
                    },
                    {
                        name: 'Default Role (Given when user joins/verifies) <defaultrole>',
                        value: def
                    },
                    {
                        name: 'Logs channel <logs>',
                        value: logs
                    },
                    {
                        name: 'Verification channel <verify>',
                        value: verify
                    },
                    {
                        name: 'Under 13 y/o role (verify channel) <underage>',
                        value: underage
                    },
                    {
                        name: "Mod Support (Ticket) Channel <ticket>",
                        value: ticket
                    },
                    {
                        name: "Ticket logging channels (and claiming) <ticketlogs>",
                        value: ticketLogs
                    }
                ],
                footer: {
                    text: 'To assign/change a setting, type ' + `${prefix}settings <setting> <new value>` + 
                           `To remove a setting, type ${prefix}settings <setting> remove`
                }
            };

            message.channel.send({ embed: current });
            return;
        }

        if(!settings.includes(use)) {
            return message.channel.send("<a:no:748782299667234966> | No such settings present.");
        }

        // const setting = guildConfig.get(use);

        if(use == 'prefix') {
            if(set == "remove") {
                message.channel.send("<a:no:748782299667234966> | You won't be able to use any bot commands if you remove the prefix... So no.");
                return;
            }
            // console.log(set)
            const prefix = guildConfig.get('prefix');
            guildConfig.updateOne({
                prefix: set
            }).then(
                message.channel.send(`:white_check_mark: | Successfully updated prefix to ${set}`)
            )
        }
        else if(use == 'welcome') {
            if(set == 'remove') {
                guildConfig.updateOne({
                    welcome: null
                }).then(
                    message.channel.send(':white_check_mark: | Successfully removed welcome channel!')
                );
                return;
            }
            const newSet = set.substr(2, 18);
            const search = message.guild.channels.cache.find(c => c.id == newSet);
            if(!search) return message.channel.send("<a:no:748782299667234966> | No such channel found.");
            guildConfig.updateOne({
                welcome: newSet
            }).then(
                message.channel.send(`:white_check_mark: | Successfully updated welcome channel to <#${search.id}>`)
            )
        }
        else if(use == 'muted') {
            if(set == 'remove') {
                guildConfig.updateOne({
                    muted: null
                }).then(
                    message.channel.send(':white_check_mark: | Successfully removed muted role!')
                );
                return;
            }
            const newSet = set.substr(3, 18);
            const search = message.guild.roles.cache.find(r => r.id == newSet);
            const clientM = message.guild.members.cache.me;
            // if(clientM.roles.highest.calculatedPosition <= search.calculatedPosition) {
            //     message.channel.send("I cannot assign that role! It is above/same as mine! Please put my role above the role so I can assign it.");
            //     return;
            // }
            if(!search)  return message.channel.send("<a:no:748782299667234966> | No such role found.");
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
            if(set == 'remove') {
                guildConfig.updateOne({
                    defaultRole: null
                }).then(
                    message.channel.send(':white_check_mark: | Successfully removed default role!')
                );
                return;
            }
            const newSet = set.substr(3, 18);
            const search = message.guild.roles.cache.find(r => r.id == newSet);
            const clientM = message.guild.members.cache.me;
            // if(clientM.roles.highest.calculatedPosition <= search.calculatedPosition) {
            //     message.channel.send("I cannot assign that role! It is above/same as mine! Please put my role above the role so I can assign it.");
            //     return;
            // }
            if(!search)  return message.channel.send("<a:no:748782299667234966> | No such role found.");
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
            if(set == 'remove') {
                guildConfig.updateOne({
                    logs: null
                }).then(
                    message.channel.send(':white_check_mark: | Successfully removed logs')
                );
                return;
            }
            const newSet = set.substr(2, 18);
            const search = message.guild.channels.cache.find(c => c.id == newSet);
            if(!search) return message.channel.send("<a:no:748782299667234966> | No such channel found.");
            guildConfig.updateOne({
                logs: newSet
            }).then(
                message.channel.send(`:white_check_mark: | Successfully updated logs channel to <#${search.id}>`)
            )
        }
        else if(use == 'verify') {
            if(set == 'remove') {
                guildConfig.updateOne({
                    verify: null
                }).then(
                    message.channel.send(':white_check_mark: | Successfully removed verification channel')
                );
                return;
            }
            const newSet = set.substr(2, 18);
            const search = message.guild.channels.cache.find(c => c.id == newSet);
            if(!search) return message.channel.send("<a:no:748782299667234966> | No such channel found.");
            guildConfig.updateOne({
                verify: newSet
            }).then(
                message.channel.send(`:white_check_mark: | Successfully updated verify channel to <#${search.id}>`)
            ).then(
                message.channel.send(
                    "**NOTE** \n" +
                    "For verification to work properly, you need to have a defaultRole (members role) and a underage role setup." + 
                    "\nThe verification system is an age verification system, with using year as age gate."
                )
            )
            const verifyEmbed = {
                author: {
                    name: message.guild.name
                },
                title: 'Verify to enter!',
                description: "Hello fellow user! Welcome to **" + message.guild.name + "**" + " Please verify to continue.",
                color: 0x4287f5,
                fields: [
                    {
                        name: "How do I verify?",
                        value: `Type ${prefix}birthday dd/mm/yyyy (your birthdate) to continue`
                    },
                    {
                        name: "Example",
                        value: `For eg. ${prefix}birthday 5/6/2009 if your birthdate is 5th June 2009`
                    },
                    {
                        name: "Why?",
                        value: `Because yes.`
                    }
                ]
            };
            search.send({ embed: verifyEmbed });
                
        }
        else if(use == 'underage') {
            if(set == 'remove') {
                guildConfig.updateOne({
                    underage: null
                }).then(
                    message.channel.send(':white_check_mark: | Successfully removed underage role!')
                );
                return;
            }
            const newSet = set.substr(3, 18);
            // console.log(newSet);
            const search = message.guild.roles.cache.find(r => r.id == newSet);
            // console.log(search.name);
            const clientM = message.guild.members.cache.me;
            // if(clientM.roles.highest.calculatedPosition <= search.calculatedPosition) {
            //     message.channel.send("I cannot assign that role! It is above/same as mine! Please put my role above the role so I can assign it.");
            //     return;
            // }
            if(!search)  return message.channel.send("<a:no:748782299667234966> | No such role found.");
            // const bot = message.guild.members.cache.find(u => u.id == client.user.id);
            // let botrole = bot.highestRole;
            // if(search.calculatedPosition > botrole.calculatedPosition) return message.channel.send('My role is below the given role, please put my role above the mentioned role.');
            guildConfig.updateOne({
                underage: newSet
            }).then(
                message.channel.send(`:white_check_mark: | Successfully updated underage role to <@&${search.id}>`)
            )
        }
        else if(use == 'ticket') {
            if(set == 'remove') {
                guildConfig.updateOne({
                    ticket_channel: null
                }).then(
                    message.channel.send(':white_check_mark: | Successfully removed mod support channel')
                );
                return;
            }
            const newSet = set.substr(2, 18);
            const search = message.guild.channels.cache.find(c => c.id == newSet);
            if(!search) return message.channel.send("<a:no:748782299667234966> | No such channel found.");
            guildConfig.updateOne({
                ticket_channel: newSet
            }).then(
                message.channel.send(`:white_check_mark: | Successfully updated mod support channel to <#${search.id}>`)
            )
        }
        else if(use == 'ticketlogs') {
            if(set == 'remove') {
                guildConfig.updateOne({
                    ticket_logs: null
                }).then(
                    message.channel.send(':white_check_mark: | Successfully removed ticket logging')
                ).then(
                    message.channel.send("Please note that ticketing will not work without a ticket logging channel (claiming needed)")
                );
                return;
            }
            const newSet = set.substr(2, 18);
            const search = message.guild.channels.cache.find(c => c.id == newSet);
            if(!search) return message.channel.send("<a:no:748782299667234966> | No such channel found.");
            guildConfig.updateOne({
                ticket_logs: newSet
            }).then(
                message.channel.send(`:white_check_mark: | Successfully updated ticket logging channel to <#${search.id}>`)
            )
        }



    }
}