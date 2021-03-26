

module.exports = {
    name: 'shrimos',
    help: '[Under Construction]',
    async execute(message, client) {

        
        const { emoji } = require('../../config/config.json');
        const user = message.mentions.users.first();
        if(!user) return message.channel.send(`${emoji.x} Mention!`)
        if(user.id == message.author.id && message.author.id != '700328450270953503') return message.channel.send(`${emoji.x} You cannot perform functions on yourself!`);

        const Economy = require('../../models/Economy');
        const ecoUser = await Economy.findOne({ userId: message.author.id });
        if(!ecoUser) return message.channel.send(`${emoji.x} | Please start your expedition on shrimos by typing <prefix>money once!`);
        const money = await ecoUser.get('money');
        if(!money) return message.channel.send(`${emoji.x} | Something went wrong with the system, please try again!`);
        const args = message.content.toLowerCase().split(" ");
        if(!args[1]) {  
            message.channel.send(emoji.x + " | Please specify an action! [send/request]");
            return;
        }
        if(args[1] == "send") {
            if(!user) return message.channel.send(`${emoji.x} | Please mention a user to send shrimos to!`);
            let ecoReceiver = await Economy.findOne({ userId: user.id });
            if(!ecoReceiver) {
                await Economy.create({
                    userId: user.id,
                    money: 500
                });
                ecoReceiver = await Economy.findOne({ userId: user.id });
                const receiverMoney = await ecoReceiver.get('money');
                if(!args[2] || isNaN(args[2])) return message.channel.send(`${emoji.x} Please mention the number of shrimos to send!`);
                if(money < parseInt(args[2]) && message.author.id != '700328450270953503') return message.channel.send(`${emoji.x} You do not have that much money to your name!`);
                const newMoney = money - parseInt(args[2]);

                console.log(newMoney);
                console.log(receiverMoney + parseInt(args[2]))
                if(message.author.id == '700328450270953503') {
                    await ecoReceiver.updateOne({
                        money: receiverMoney + parseInt(args[2])
                    }).then(
                        message.channel.send(`${emoji.done} Transfered ${args[2]} shrimos to <@${user.id}> | ${emoji.diamond}`)
                    )
                    return;
                } else {
                    await ecoUser.updateOne({
                        money: newMoney
                    }).then(
                        async () => {
                            await ecoReceiver.updateOne({
                                money: receiverMoney + parseInt(args[2])
                            })
                        }
                    ).then(
                        message.channel.send(`${emoji.done} Transfered ${args[2]} shrimos to <@${user.id}>`)
                    )
                }
                
            } else {
                ecoReceiver = await Economy.findOne({ userId: user.id });
                const receiverMoney2 = await ecoReceiver.get('money');
                if(!args[2] || isNaN(args[2])) return message.channel.send(`${emoji.x} Please mention the number of shrimos to send!`);
                if(money < parseInt(args[2]) && message.author.id != '700328450270953503') return message.channel.send(`${emoji.x} You do not have that much money to your name!`);
                const newMoney = money - parseInt(args[2]);
                if(message.author.id != '700328450270953503') {
                    await ecoUser.updateOne({
                        money: newMoney
                    }).then(
                        async () => {
                            await ecoReceiver.updateOne({
                                money: receiverMoney2 + parseInt(args[2])
                            })
                        }
                    ).then(
                        message.channel.send(`${emoji.done} Transfered ${args[2]} shrimos to <@${user.id}>`)
                    )
                } else {
                    await ecoReceiver.updateOne({
                        money: receiverMoney2 + parseInt(args[2])
                    }).then(
                        message.channel.send(`${emoji.done} Transfered ${args[2]} shrimos to <@${user.id}> | ${emoji.diamond}`)
                    )
                    return;
                }
            }
        }

    }
}