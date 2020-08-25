require('dotenv').config();
const Discord = require('discord.js');
const eat = new Discord.Client();
eat.login(process.env.TOKEN);

eat.on('ready', () => {
    console.log("TEST READY");
})

eat.on('message', message => {

    const prefix = 's@';
    const msg = message.content.toLowerCase();
    console.log(msg);
    if(!msg.startsWith(prefix)) return;
    
    const args = msg.split(" ");
    const command = args[0].slice(prefix.length);

    if(command == 'ticket') {

        console.log("ticket");

        if(args[1] == 'create') {

            console.log("create");

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