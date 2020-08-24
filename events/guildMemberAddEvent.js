const GuildConfig = require('../models/GuildConfig');

module.exports = async (client, member) => {

    const guildConfig = await GuildConfig.findOne({ guildId: member.guild.id });
    const welcome = guildConfig.get('welcome');
    const defaultRole = guildConfig.get('defaultRole');
    const role = member.guild.roles.cache.find(r => r.id == defaultRole);

    if(!defaultRole) {
        //do nothing
    } else {
        member.roles.add(role);
    }

    if(!welcome) return console.log("nope");

    const welcomeChannel = member.guild.channels.cache.find(ch => ch.id == welcome);
    welcomeChannel.send(`Hey <@${member.id}>! Welcome to **${member.guild.name}**!`);

    



}