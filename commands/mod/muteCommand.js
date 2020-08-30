
module.exports = {
    name: 'mute',
    help: `<prefix>mute @user \nMutes a user`,
    async execute(message, client) {
        if(!message.member.hasPermission('KICK_MEMBERS')) return;
        const authorRolePosition = message.member.roles.highest.calculatedPosition;
        const mutee = message.mentions.users.first();
        if(!mutee) return message.channel.send("<a:no:748782299667234966> | Please mention a user to mute.");
        const muteP = message.guild.members.cache.find(m => m.id == mutee.id);
        if(!mutee) return message.channel.send("<a:no:748782299667234966> | Member not found in the server!");

        const GuildConfig = require('../../models/GuildConfig');
        const guildConfig = await GuildConfig.findOne({ guildId: message.guild.id });
        const muteRole = await guildConfig.get('muted');
        // console.log(muteRole);
        if(muteP == message.member ) {
            message.channel.send("<a:no:748782299667234966> | You cannot mute yourself!");
            return;
        }
        console.log(muteP.roles.highest);
        if(muteP.roles.highest.rawPosition >= message.member.roles.highest.rawPosition) {
            message.channel.send(" <a:no:748782299667234966> | You cannot mute a user with same/higher role than you!")
            return;
        } 
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
                        // console.log(m.id);
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
                        message.channel.send(" :white_check_mark: | Muted " + muteP.user.username)
                    }
                )
    
                
                return;
            } else {
                
                const mutedRole = message.guild.roles.cache.find(r => r.id == muteRole);
                if(!mutedRole) {
                    message.channel.send("<a:no:748782299667234966> | Mute role outdated!");
                    return
                };
                muteP.roles.add(mutedRole).then(
                    muteP.send(`You have been muted in the server **${message.guild.name}**`)
                ).then(
                    message.channel.send(":white_check_mark: | Muted " + muteP.user.username)
                );
            }
        }, 1000);
    }
}