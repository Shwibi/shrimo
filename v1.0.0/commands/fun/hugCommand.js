module.exports = {
    name: 'hug',
    help: 's?hug @user \nHug people because hugs are fun',
    description: 'Hug people! Woo!',
    execute(message, client) {
        const user = message.mentions.users.first();
        if(!user) {
            message.channel.send('<a:no:748782299667234966> | Mention a user to hug please.');
            return;
        }
        const member = message.guild.members.cache.find(u => u.id == user.id);
        const name = member.displayName || member.username || member.author.username;
        const long = name.slice(Math.floor((90*name.length)/100));

        if(user.id === message.member.id) {
            message.channel.send(`Aw ${name}! do you want a hug? I'll hug youuu *hugs* <3`);
            return;
        }


        const hugSend = [
            `${name}${long}${long}${long} hiiii *hugs* OwO`,
            `huggiieesss, ${name} was hugged by EVERYONE (also ${message.author.username})`,
            `hugs are good for health, have hugggsss *hugs ${name}*`,
            `HUGSSS *hugs* hi ${name}! HUG hug HUGEUGwdgasgu :D`,
            `:D hugs! *hugs ${name}*`,
            `hug de boop!`,
            `HUGGIEESSS ${name}!`,
            `hugs! *hugs*`,
            `<@${member.id}> C'MERE! HUG TIME! *tackle hugs*`,
            `huggiiessss ${name}!`
        ]

        const index = Math.floor(Math.random() * (hugSend.length)); 
        message.channel.send(hugSend[index]);
        

    }
}