const Discord = require('discord.js');

module.exports = {
    name: 'dmall',
    help: '<prefix>dmall Message to send \nDM All the users of the guild, owner only command.',
    async execute(message, client) {
        if(!message.member.hasPermission({ checkOwner: true })) return message.delete();
        if(message.guild.ownerID != message.author.id) return message.delete();

        const { emoji } = require('../../config/config.json');

        const dm = message.content.split(" ").slice(1).join(" ");
        if(!dm) return message.channel.send(`${emoji.x} | Mention a message to DM all users!`);

        const collector = new Discord.MessageCollector(message.channel, m => m.author.id == message.author.id, {time: 10000});

        message.channel.send(`${emoji.info} | Are you sure you want to send the message \n${dm} \n to all members of this guild? If yes, type confirm, if no, type any other key. (Max response tiem: 10 seconds)`).then(
            async m => {
                collector.on('collect', msg => {
                    msg.delete();
                    if(msg.content.toLowerCase() == 'confirm') {
                        message.guild.members.cache.filter(m => !m.user.bot).forEach(member => {
                            member.send(dm);
                        })
                        m.edit(`${emoji.done} | Sent the dm to all users of this guild!`).then(
                            m.delete()
                        )
                        return;
                    } else {
                        m.edit(`${emoji.x} | Process terminated`);
                        return;
                    }
                })
                setTimeout(() => {
                    if(!m) return;
                    m.edit(`${emoji.x} | Time up! You did not provide any response, process terminated.`)
                }, 10000);
            }
        )


    }
}