const { execute } = require("./hugCommand");
const { Guild } = require("discord.js");

module.exports = {
    name: 'boop',
    help: '<prefix>boop @user \nBoop people!',
    async execute(message, client) {
        const user = message.mentions.users.first();
        if(!user) {
            message.channel.send('<a:no:748782299667234966> | Please mention a user to booppp! OwO');
            return;
        }
        const guildUser = message.guild.members.cache.find(u => u.id == user.id);
        if(!guildUser) {
            message.channel.send('<a:no:748782299667234966> | User doesnt exist in this sevrer ;-;');
            return;
        }
        const name = guildUser.displayName || guildUser.member.displayName || guildUser.user.username || guildUser.username;
        const boops = [
            `*boops ${name}*`,
            `BOOP DE BLOB! *boops ${name}*`,
            `*paw boops* hi ${name}!`,
            `*quick boops ${name}*`,
            `${name}! ${name}!!! BOOP!! *boops*`,
            `*boop le snoot* ${name}!`
        ];
        const index = Math.floor(Math.random() * boops.length);
        message.channel.send(boops[index]);
        
    }
}