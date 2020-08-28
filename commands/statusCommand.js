const { emoji } = require('../config/config.json');

module.exports = {
    name: 'status',
    help: '<prefix>status New bot status \nSet the bot status to something! \n**PREMIUM COMMAND**' + emoji.premium,
    async execute(message, client) {
        const PremiumUsers = await require('../models/PremiumUsers');
        const premiumUser = await PremiumUsers.findOne({ userId: message.author.id});
        
        if(!premiumUser) return message.channel.send(`${emoji.x} | You are not a premium user.`);
        const status = message.content.split(" ").slice(1).join(" ");
        if(!status) {
            message.channel.send(`${emoji.x} | Please mention a status to set!`);
            return;
        }
        client.user.setActivity(status).then(
            message.channel.send(`${emoji.done} | Set status to **${status}**`)
        )
    }
}