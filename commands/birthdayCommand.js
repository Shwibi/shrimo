module.exports = {
    name: 'birthday',
    async execute(message, client){

        message.delete();
        const GuildConfig = require('../models/GuildConfig');
        const guildConfig = await GuildConfig.findOne({ guildId: message.guild.id });

        const verify = await guildConfig.get('verify');
        if(!verify) return message.reply("No verification system setup for this server.");

        // const verifyChannel = message.guild.channels.cache.find(ch => ch.id == verify);
        if(message.channel.id != verify) return;

        const member = await guildConfig.get('defaultRole');
        const underage = await guildConfig.get('underage');
        const memberRole = message.guild.roles.cache.find(r => r.id == member);
        const underageRole = message.guild.roles.cache.find(r => r.id == underage);

        if(!member || !underage) {
            return message.reply("No verify roles found");
        }

        if(message.member.roles.cache.has(member) || message.member.roles.cache.has(underage)) return console.log('No');

        
        // const verify = message.guild.channels.cache.get(ch => ch.name === 'verify') || client.channels.cache.get('746217071620128879');

        // if(message.channel.id != verify.id) return;

        const birthday = message.content.split(" ")[1].split("/");
        if(!birthday) return;
        // console.log(birthday)
        const d = new Date();
        // console.log(d)
        
        const yearb = birthday[2];
        if(yearb.length != 4) return;
        const yearc = d.getFullYear();
        // console.log(yearb, yearc)

        const age = yearc - yearb;
        if(age < 13) {
                message.member.roles.add(underageRole);
            
        } else {
                message.member.roles.add(memberRole);
        }
        
    }
}