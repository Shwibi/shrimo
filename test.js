require('dotenv').config();
const Discord = require('discord.js');
const eat = new Discord.Client();
eat.login(process.env.TOKEN);

eat.on('ready', () => {
    console.log("TEST READY");
})

eat.on('messageReactionAdd', reaction => {



})

eat.on('message', message => {

    if (message.content == '!check') {
        message.channel.send(
            `${eat.users.cache.size} Users \n` +
            `${eat.channels.cache.size} Channels \n` +
            `${eat.guilds.cache.size} Guilds`
        )
    }

})