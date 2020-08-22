module.exports = {
    name: 'birthday',
    execute(message, client){
        message.delete();

        

        if(message.member.roles.cache.has('746214235867971675') || message.member.roles.cache.has('746563022733967472')) return;
        const verify = message.guild.channels.cache.get(ch => ch.name === 'verify') || client.channels.cache.get('746217071620128879');

        if(message.channel.id != verify.id) return;

        const birthday = message.content.split(" ")[1].split("/");
        if(!birthday) return;
        const d = new Date();
        
        const yearb = birthday[2];
        const yearc = d.getFullYear();
        const age = yearc - yearb;
        if(age < 13) {
            try {
                message.member.roles.add('746563022733967472');
            } catch (err) {
                message.channel.send("Not enough permissions/roles. Error: ```" + err + "```");
            }
        } else {
            try {
                message.member.roles.add('746214235867971675');
            } catch (err) {
                message.channel.send("Not enough permissions/roles. Error: ```" + err + "```");
            }
            
            
        }
        
    }
}