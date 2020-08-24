module.exports = async (client, guild) => {

    const GuildConfig = require('../models/GuildConfig');

    console.log("Bot added to server");

    try {
        const guildConfig = await GuildConfig.create({
            guildId: guild.id
        })
    } catch (err) {
        console.log(err);
    }

}