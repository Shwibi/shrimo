const Discord = require('discord.js');
const eat = new Discord.Client();

eat.once('ready', () => {
    console.log("TEST READY");
})

egg.on('message', message => {

    const prefix = 's@';
    const msg = message.content.toLowerCase();
    if(!msg.startsWith(prefix)) return;
    
    const args = msg.split(" ");
    const command = args[1].slice(prefix.length);

    if(command == 'muted') {
        
    }

})