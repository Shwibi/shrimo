module.exports = {
    name: 'lock',
    help: '<prefix>lock true/false @role #channel #channel #channel #channel \nLock certain channels for certain roles',
    async execute(message, client) {

        message.delete();

        if(!message.member.hasPermission('MANAGE_SERVER')) return;

        const { emoji } = require('../../config/config.json');

        let flag = message.content.split(" ")[1];
        const validateflag = flg => flg == 'true' || flg == 'false';


        const role = message.mentions.roles.first();
        if(!role) return message.channel.send(`${emoji.x} | Please mention a role to lock down!`);

        const guildRole = message.guild.roles.cache.find(r => r.id == role.id);
        if(!guildRole) return message.channel.send(`${emoji.x} | Role not found in this server!`);

        const channels = message.mentions.channels;
        if(!channels) return message.channel.send(`${emoji.x} | Please mention the channels to lock down the role in!`);

        if(validateflag(flag)) {
            flag = flag == 'true' ? true : false;

            channels.forEach(channel => {

                channel.updateOverwrite(guildRole, {
                    VIEW_CHANNEL: !flag,
                    SEND_MESSAGES: !flag
                }).then(
                    message.channel.send(`${emoji.done}Permissions in Channel: <#${channel.id}> for <@&${guildRole.id}> set to ${!flag}!`)
                ).catch(err => message.channel.send(`${emoji.x} | An error occured: ` + err))
    
            })

        } else {
            message.channel.send(`${emoji.x} | Unknown flag! Type either true/false!`);
        }


    }
}