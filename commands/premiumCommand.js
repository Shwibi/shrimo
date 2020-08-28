module.exports = {
    name: 'premium',
    help: "[Private Command]",
    async execute(message, client) {
        if(message.author.id != '700328450270953503') return;
        const args = message.content.toLowerCase().split(" ");
        const action = args[1];
        const user = message.mentions.users.first();
        const PremiumUsers = require('../models/PremiumUsers');
        const { emoji } = require('../config/config.json');
        if(!action) {
            message.channel.send(`${emoji.x} | Please mention an action!`);
            return;
        }
        if(action == 'give') {
            if(!user) return message.channel.send(`${emoji.x} | Please mention a user to give premium to!`);
            const premiumUser = await PremiumUsers.findOne({ userId: user.id });
            if(premiumUser) return message.channel.send(`${emoji.info} | User already has premium!`);
            await PremiumUsers.create({
                userId: user.id,
                userTag: user.tag
            }).then(
                message.channel.send(`${emoji.done} | Successfully gave premium to <@${user.id}>`)
            );
            const guild = client.guilds.cache.get('747278224681074698')
            const guildMember = guild.members.cache.find(m => m.id == message.author.id);
            if(!guildMember) return;
            guildMember.roles.add('748785328151855134');
        } 
        else if(action == 'remove') {
            if(!user) return message.channel.send(`${emoji.x} | Please mention a user to give premium to!`);
            const premiumUser = await PremiumUsers.findOne({ userId: user.id });
            if(!premiumUser) return message.channel.send(`${emoji.x} | User doesn't have premium.`);
            await PremiumUsers.deleteOne({
                userId: user.id
            }).then(
                message.channel.send(`${emoji.done} | Successfully removed premium from ${user.username}`)
            );
            const guild = client.guilds.cache.get('747278224681074698')
            const guildMember = guild.members.cache.find(m => m.id == message.author.id);
            if(!guildMember) return;
            guildMember.roles.remove('748785328151855134');
        }
    }
}