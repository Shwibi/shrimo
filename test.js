const Discord = require('discord.js');
const eat = new Discord.Client();

eat.on('ready', () => {
    console.log("TEST READY");
})

eat.on('message', message => {

    const prefix = 's@';
    const msg = message.content.toLowerCase();
    if(!msg.startsWith(prefix)) return;
    
    const args = msg.split(" ");
    const command = args[1].slice(prefix.length);

    if(command == 'ticket') {

        if(args[1] == 'create') {

            message.guild.channels.create(`ticket-${message.author.username}`, {
                permissions: [
                    {
                        id: message.guild.id,
                        deny: 'VIEW_MESSAGES'
                    },
                    {
                        id: message.author.id,
                        allow: 'VIEW_MESSAGES'
                    }
                ]
            });
            

        }


    }

})