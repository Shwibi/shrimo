const { execute } = require("./hugCommand");

module.exports = {
    name: 'unmute',
    help: "<prefix>unmute @user \nUnmute a user",
    async execute(message, client) {

        const GuildConfig = require('../models/GuildConfig');
        const guildConfig = await GuildConfig.findOne({ guildId: message.guild.id });
        const muteRoleID = await guildConfig.get('muted');
        const muteRole = message.guild.roles.cache.find(r => r.id == muteRoleID);
        if(!muteRoleID) {
            return message.channel.send("What? no. WHAT? O..kay then. No muted role found.");
        }
        const member = message.mentions.users.first();
        if(!member) return message.channel.send("Please mention a user to unmute!");
        if(member.roles.cache.has(muteRole)) {
            member.roles.remove(muteRole).then(
                message.channel.send(" :white_check_mark: | ")
            )
        }

    }
}