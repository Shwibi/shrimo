module.exports = {
    name: 'chocolate',
    help: "CHOCOLATE!",
    async execute(message, client) {

        const PremiumUsers = require('../models/PremiumUsers');
        const premiumUser = await PremiumUsers.findOne({ userId: message.author.id });
        if(!premiumUser) {
            await PremiumUsers.create({
                userId: message.author.id,
                userTag: message.author.tag
            }).then(
                message.channel.send("<:done:748753320625045535> | Premium acheived! Congrats!")
            )
        } else {
            message.channel.send("<:info:747755288261558285> | You are already a premium user!")
        }

    }
}