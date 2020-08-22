require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
client.login(process.env.TOKEN);

fs.readdir('./events/', (err, files) => {
    if(err) return console.error;
    files.forEach(file => {
        if(!file.endsWith('.js')) return;
        const event = require(`./events/${file}`);
        const eventName = file.split("Event.")[0];
        console.log(`Loaded ${eventName}`);
        client.on(eventName, event.bind(null, client));
    })
})