module.exports = {
    name: 'buy',
    help: '[Under Construction]',
    async execute(message, client) {

        const { emoji } = require('../../config/config.json');
        const Economy = require('../../models/Economy');
        const ecoUser = await Economy.findOne({ userId: message.author.id });
        if(!ecoUser) return message.channel.send(`${emoji.x} | Please use the money command once to start your expediture on shrimo points!`);
        const args = message.content.toLowerCase().split(" ");
        
        const money = await ecoUser.get('money');
        const storage = await ecoUser.get('storage');
        if(!args[1] || args[1] == 'shop') {

            message.channel.send(`${emoji.info} | Please use <prefix>shop to see the shop!`)
            return;


        }
        else if(args[1] == 'premium') {
            if(storage.includes("premium")) return message.channel.send(`${emoji.x} | You already have a premium item!`);
            if(money < 5000 && message.author.id != '700328450270953503') return message.channel.send(`${emoji.x} You do not have enough money!`);
            const newMoney = money - 5000;
            ecoUser.updateOne({
                money: newMoney
            }).then(
                await ecoUser.updateOne({
                    $push : {
                        storage: "premium"
                    }
                })
            ).then(
                message.channel.send(`${emoji.done} Successfully purchased Premium ${emoji.diamond}! Do <prefix>buy to see your new items!`)
            )
        }
        else if(args[1] == 'goldenticket') {
            if(storage.includes("goldenticket")) return message.channel.send(`${emoji.x} | You already have a Golden Ticket!`);
            if(money < 2500 && message.author.id != '700328450270953503') return message.channel.send(`${emoji.x} You do not have enough money!`);
            const newMoney = money - 2500;
            await ecoUser.updateOne({
                $push : {
                    storage: "goldenticket"
                }
            }).then(
                await ecoUser.updateOne({
                    money: newMoney
                })
            ).then(
                message.channel.send(`${emoji.done} | Successfully purchased A Golden Ticket!`)
            )
        }
        else if(args[1] == 'nuke') {
            if(storage.includes('nuke')) return message.channel.send(`${emoji.x} | You already own a Nuke!`);
            if(money < 500 && message.author.id != '700328450270953503') return message.channel.send(`${emoji.x} You do not have enough money!`);
            const newMoney = money - 500;
            await ecoUser.updateOne({
                $push : {
                    storage: "nuke"
                }
            }).then(
                await ecoUser.updateOne({
                    money: newMoney
                })
            ).then(
                message.channel.send(`${emoji.done} | Successfully purchased A Nuke! ${emoji.core} Use it properly, it can be very devastating!`)
            )
        } 
        else if(args[1] == 'coffee') {
            if(storage.includes('nuke')) return message.channel.send(`${emoji.x} | You already own a Coffee!`);
            if(money < 20 && message.author.id != '700328450270953503') return message.channel.send(`${emoji.x} You do not have enough money!`);
            const newMoney = money - 20;
            await ecoUser.updateOne({
                $push : {
                    storage: "coffee"
                }
            }).then(
                await ecoUser.updateOne({
                    money: newMoney
                })
            ).then(
                message.channel.send(`${emoji.done} | Successfully purchased Coffee!`)
            )
        }
        else if(args[1].toLowerCase() == 'gpremium' || args[1].toLowerCase() == 'premiumg') {

            if(storage.includes('premium-guild')) return message.channel.send(`${emoji.x} | You already own a Premium Guild Item!`);
            if(money < 10000 && message.author.id != '700328450270953503') return message.channel.send(`${emoji.x} You do not have enough money!`);

            const newMoney = money - 10000;
            await ecoUser.updateOne({
                $push : {
                    storage: "premium-guild"
                }
            }).then(
                message.channel.send(`${emoji.done} | Successfully bought Premium Guild Item! ${emoji.diamond} Use this option in a guild you want to add premium to, careful, you cannot reuse the same item for multiple guilds and you will have to purchase another premium guild item to get more premiums!`)
            )

        }


    }
}