module.exports = async (client, guild) => {

    const GuildConfig = require('../models/GuildConfig');

    console.log("Bot added to server");

    const guildConfigFetch = await GuildConfig.findOne({ guildId: guild.id });
    if(guildConfigFetch) return;

    try {
        const guildConfig = await GuildConfig.create({
            guildId: guild.id,
            guildName: guild.name
        })
    } catch (err) {
        console.log(err);
    }

}