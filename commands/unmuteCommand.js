const { execute } = require("./hugCommand");

module.exports = {
    name: 'unmute',
    help: "<prefix>unmute @user \nUnmute a user",
    async execute(message, client) {
        if(!message.member.hasPermissions('KICK_MEMBERS')) return;

        const GuildConfig = require('../models/GuildConfig');
        const guildConfig = await GuildConfig.findOne({ guildId: message.guild.id });
        const muteRoleID = await guildConfig.get('muted');
        const muteRole = message.guild.roles.cache.find(r => r.id == muteRoleID);
        if(!muteRoleID) {
            return message.channel.send("<a:no:748782299667234966> | What? no. WHAT? O..kay then. No muted role found.");
        }
        const member = message.mentions.users.first();
        // console.log(member);
        const guildMember = message.guild.members.cache.find(m => m.id == member.id);
        if(!member) return message.channel.send("<a:no:748782299667234966> | Please mention a user to unmute!");
        if(guildMember.roles.cache.has(muteRole.id)) {
            guildMember.roles.remove(muteRole).then(
                message.channel.send(" :white_check_mark: | Successfully unmuted " + guildMember.user.username)
            )
        } else {
            message.channel.send(" :x: | User is already unmuted!")
        }
            
        

    }
}