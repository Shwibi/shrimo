const GuildConfig = require('../models/GuildConfig');

module.exports = (client, member) => {

    const guildConfig = GuildConfig.findOne({ guildId: member.guild.id });
    const welcome = guildConfig.get('welcome');

    if(!welcome) return;

    const welcomeChannel = member.guild.channels.cache.find(ch => ch.id == welcome);
    welcome.send(`Hey <@${member.id}>! Welcome to **${member.guild.name}**!`);

}