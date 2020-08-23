module.exports = {
    name: 'hug',
    help: 's?hug @user \nHug people because hugs are fun',
    execute(message, client) {
        const user = message.mentions.users.first();
        if(!user) {
            message.channel.send('Mention a user my dude.');
            return;
        }
        const name = user.displayName || user.username || user.author.username;
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
            `:D hugs! *hugs ${name}*`
        ]

        const index = Math.floor(Math.random() * (hugSend.length - 1)); 
        message.channel.send(hugSend[index]);
        

    }
}