const { execute } = require("./buyCommand");

module.exports = {
    name: 'shop',
    help: '<prefix>shop \nSee the Shrimo shop!',
    async execute(message, client) {

        const { emoji, theme } = require('../../config/config.json');
        const themes = require('../../config/themes.json');
        const indexLine = Math.floor(Math.random() * themes[theme].lines.length);
        const Economy = require('../../models/Economy');
        const ecoUser = await Economy.findOne({ userId: message.author.id });
        if (!ecoUser) return message.channel.send(`${emoji.x} | Please use the money command once to start your expediture on shrimo points!`);

        const money = await ecoUser.get('money');
        const storage = await ecoUser.get('storage');

        const shopEmbed = {
            author: {
                name: "Shop @ Shrimo",
                icon_url: "https://cdn.icon-icons.com/icons2/1706/PNG/512/3986701-online-shop-store-store-icon_112278.png"
            },
            title: "Shop!",
            description: "Here are all the items in the shop!" + ` Your balance: ${money} Shrimos`,
            color: themes[theme].color.json,
            fields: [
                {
                    name: `${emoji.diamond}Special items`,
                    value: `[Premium](https://bit.ly/shwibot, 'Premium Shrimo, Cost: 5000 shrimos, Get shrimo premium item and use it to get shrimo premium! \nBuy: <prefix>buy premium'), [Premium Guild](https://bit.ly/shwibot, 'Premium Guild, Cost: 10000 shrimos, Use the Premium Guild in a guild to get shrimo premium for that guild! \nBuy: <prefix>buy premiumg OR <prefix>buy gpremium')`
                },
                {
                    name: `${emoji.coin}Economy items`,
                    value: `[Golden Ticket](https://bit.ly/shwibot, 'Golden Ticket, Cost: 2500, Use the golden ticket to get exciting prizes! \nBuy: <prefix>buy goldenticket'), [Nuke](https://bit.ly/shwibot, 'Nuke, Cost: 500 shrimos, Use the nuke to blast someone >:D \nBuy: <prefix>buy nuke')`
                },
                {
                    name: `:apple: Food items`,
                    value: `[Coffee](https://bit.ly/shwibot, 'Coffee, Cost: 20 shrimos, EAT COFFEE \nBuy: <prefix>buy coffee')`
                },
                {
                    name: `Your items~`,
                    value: storage.join(', ') || "You dont own any items!"
                }
            ],
            footer: {
                text: "That's about it for the shop! Type <prefix>buy <option> to buy something! Hover over the option to see more details on how to purchase them! | " + themes[theme].lines[indexLine]
            }
        };

        message.channel.send({ embed: shopEmbed });

    }
}