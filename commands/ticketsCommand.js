const { execute } = require("./hugCommand");

module.exports = {
    name: 'tickets',
    help: "<prefix>tickets @user \nKnow how many tickets a user has open currently.",
    async execute(message, client) {
        if(!message.member.hasPermission('ADMINISTRATORS')) return;
        const user = message.mentions.users.first();
        if(!user) {
            message.channel.send("<a:no:748782299667234966> | Please mention a user whose tickets you want to see.");
            return;
        }
        const guildUser = message.guild.members.cache.find(m => m.id == user.id);
        const Tickets = require('../models/Tickets');
        const userTickets = await Tickets.findOne({ guildId: message.guild.id, userId: user.id});
        if(!userTickets) {
            message.channel.send(`${guildUser.user.username} tickets: 0 (data not found)`);
            return;
        } else{
            const count = await userTickets.get('count');
            message.channel.send(`${guildUser.user.username} tickets: ${count}`);
        }
    }
}