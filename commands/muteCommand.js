const { execute } = require("./hugCommand");

module.exports = {
    name: 'mute',
    help: `<prefix>mute @user \nMutes a user`,
    async execute(message, client) {
        if(!message.member.hasPermission('KICK_MEMBERS')) return;
        const authorRolePosition = message.member.roles.highest.calculatedPosition;
        const mutee = message.mentions.users.first();
        const muteP = message.guild.members.cache.find(m => m.id == mutee.id);
        if(!mutee) return message.channel.send("Please mention a user to mute.");

        const GuildConfig = require('../models/GuildConfig');
        const guildConfig = await GuildConfig.findOne({ guildId: message.guild.id });
        const muteRole = await guildConfig.get('muted');
        console.log(muteRole);
        setTimeout(() => {
            if(!muteRole) {
                message.guild.roles.create(
                    {
                        data: {
                            name: 'Muted'
                        },
                        reason: 'Created a Muted Role -Shwi'
                    }
                ).then(
                    async m => {
                        console.log(m.id);
                        await guildConfig.updateOne(
                            {
                                muted: m.id
                            }
                        )
                        muteP.roles.add(m);
                        var mR = m;
                        const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
                        channels.forEach(channel => {
                            channel.updateOverwrite(mR, {
                                SEND_MESSAGES: false,
                                VIEW_MESSAGES: false,
                                ADD_REACTIONS: false
                            })
                        })
                    }
                )
    
                
                return;
            } else {
                
                const mutedRole = message.guild.roles.cache.find(r => r.id == muteRole);
                if(!mutedRole) {
                    message.channel.send("Mute role outdated!");
                    return
                };
                muteP.roles.add(mutedRole);
            }
        }, 5000);
    }
}