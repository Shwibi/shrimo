module.exports = async (client, guild) => {
    const GuildConfig = require('../models/GuildConfig');
    const guildConfig = await GuildConfig.findOne({guildId: guild.id});
    if(!guildConfig) return;
    await GuildConfig.deleteOne({guildId: guild.id});
}