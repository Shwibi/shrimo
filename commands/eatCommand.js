module.exports = {
    name: 'eat',
    help: 's?eat @user \nEat.',
    execute(message, client) {
        const user = message.mentions.users.first();
        if(!user) {
            message.channel.send('Mention someone, mate, ok? ok. Good.');
            return;
        }
        if(user.id == message.member.id) {
            message.channel.send("Why.. just like, why do you wanna eat yourself? Are you ok?");
        }
        const name = user.displayName || user.author.username || user.member.displayName || user.username;
        const eatSend = [
            `*rolls into ${name} and eats*`,
            `Eat the sun! ${name}! Eat the SUN!`,
            `*eats ${name}*`,
            `Yum. <@${user.id}> is yummy.`,
            `HEHEHEHEHEHE *silently noms on ${name}*`,
            `Be happy, eat ${name}s`
        ]
        const index = Math.floor(Math.random() * (eatSend.length - 1));
        message.channel.send(eatSend[index]);
        
        
    }
}