module.exports = {
    name: 'birthday',
    execute(message, client){
        const verify = message.guild.channels.cache.get(ch => ch.name === 'verify') || client.channels.cache.get('746217071620128879');

        // if(message.channel.id != verify.id) return;

        const birthday = message.content.split(" ")[1].split("/");
        if(!birthday) return;
        if(birthday[0] > 12) return;
        if(birthday[1] > 31) return;
        if(birthday[2] > 99) return;

        if(birthday[2] > 7) {
            message.channel.send("no");
        }
        
    }
}