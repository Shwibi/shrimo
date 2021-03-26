

module.exports = {
    name: 'money',
    help: '[Under Construction]',
    async execute(message, client) {
        const { emoji } = require('../../config/config.json');
        const Economy = require('../../models/Economy');
        const moneyUser = await Economy.findOne({ userId: message.author.id });
        if(!moneyUser) {
            await Economy.create({
                userId: message.author.id,
                money: 500
            }).then(
                message.channel.send(`**Current balance:** 500`)
            )
        } else {
            const balance = await moneyUser.get('money');
            if(!moneyUser) return message.channel.send(`${emoji.x} Something went wrong, please try again!`);
            message.channel.send(`**Current balance:** ${balance}`)
        }

    }
}