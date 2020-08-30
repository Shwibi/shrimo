const { execute } = require("./buyCommand");

module.exports = {
    name: 'use',
    help: '[Under Construction]',
    async execute(message, client) {
        const { emoji } = require('../config/config.json');
        const Economy = require('../models/Economy');
        const ecoUser = await Economy.findOne({ userId: message.author.id });

        if(!ecoUser) {
            message.channel.send(`${emoji.x} | Please start your journey by typing <prefix>money once!`);
            return;
        }
        const storage = await ecoUser.get('storage');
        if(!storage) return message.channel.send(`${emoji.x} | You do not have any items`);
        const money = await ecoUser.get('money');
        const args = message.content.toLowerCase().split(" ");
        if(!args[1]) return message.channel.send(`${emoji.x} | Please mention an item to use!`);
        if(args[1] == 'premium') {
            if(storage.includes('premium')) { {
                        message.channel.send(`${emoji.time} | Using premium...`).then(
                            async m => {

                                const PremiumUsers = require('../models/PremiumUsers');
                                const premiumUser = await PremiumUsers.findOne({ userId: message.author.id });
                                if(!premiumUser) {
                                    await ecoUser.updateOne({
                                        $pull : {
                                            storage: "premium"
                                        }
                                    })
                                    await PremiumUsers.create({
                                        userId: message.author.id,
                                        userTag: message.author.tag
                                    }).then(
                                        m.edit("<:done:748753320625045535> | Premium acheived! Congrats!")
                                    );
                                    const guild = client.guilds.cache.get('747278224681074698')
                                    const guildMember = guild.members.cache.find(m => m.id == message.author.id);
                                    if(!guildMember) return;
                                    guildMember.roles.add('748785328151855134');
                                } else {
                                    m.edit("<:info:747755288261558285> | You are already a premium user!");
                                   
                                }

                            }
                        )
                    }
                
            } else {
                message.channel.send(`${emoji.x} | You don't own premium item!`)
            } 
        } else if(args[1] == "goldenticket") {
            const array = [
                100, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100, 100, 500, 200, 100, 60, 10, 2000, 10, 100, 50, 450
            ]
            const index = Math.floor(Math.random() * array.length);
            const win = array[index];
            const newMoney = money + win;
            if(!storage.includes('goldenticket')) return message.channel.send(`${emoji.x} | You don't own a golden ticket!`)
            message.channel.send(`${emoji.time} Using Golden Ticket...`).then(
                async m => {
                    await ecoUser.updateOne({
                        $pull : {
                            storage: 'goldenticket'
                        }
                    }).then(
                        await ecoUser.updateOne({
                            money: newMoney
                        })
                    ).then(
                        m.edit(`${emoji.gold} You won ${win} shrimos!`)
                    )
                }
            )
        } else if(args[1] == 'nuke') {
            if(!storage.includes('nuke')) return message.channel.send(`${emoji.x} You don't own a nuke!`);

            const nukee = message.mentions.users.first();
            if(!nukee) return message.channel.send(`${emoji.x} | Mention a user to nuke! :p ${emoji.core}`);

            const nukeeUser = await Economy.findOne({ userId: nukee.id });
            if(!nukeeUser) return message.channel.send(`${emoji.x} | That user hasn't started their journey yet, oops!`);

            const guildNuke = message.guild.members.cache.find(m => m.id == nukee.id);
            if(!guildNuke) return message.channel.send(`${emoji.x} | That user doesn't exist in this guild...`);

            const nukeeMoney = await nukeeUser.get('money');
            const array = [
                nukeeMoney * 0.2,
                nukeeMoney * 0.3,
                nukeeMoney * 0.3,
                nukeeMoney * 0.1,
                nukeeMoney * 0.5,
                nukeeMoney * 0.3,
                nukeeMoney * 0.7,
                nukeeMoney * 0.5
            ]
            const index = Math.floor(Math.random() * array.length);
            const nuke = array[index];
            console.log(nuke);
            const newNuke = Math.floor(nuke);
            await nukeeUser.updateOne({
                money: newNuke
            }).then(
                message.channel.send(`${emoji.core} Nuked <@${nukee.id}>! (Nuke: ${nukeeMoney - (Math.floor(nuke))})`)
            ).then(
                await ecoUser.updateOne({
                    $pull : {
                        storage: 'nuke'
                    }
                })
            )
        }
        else if(args[1] == 'coffee') {
            if(!storage.includes('coffee')) return message.channel.send(`${emoji.x} | You do not have coffee!`);
            await ecoUser.updateOne({
                $pull : {
                    storage: 'coffee'
                }
            }).then(
                message.channel.send(`:coffee: Drinking hot fresh coffee!`).then(
                    m => {
                        setTimeout(() => {
                            m.edit(`${emoji.emptycoffee} Ah! So fresh! *Successfully drank coffee and acheived caffienism*`)
                        }, 3000)
                    }
                )
            )
        }

    }
}