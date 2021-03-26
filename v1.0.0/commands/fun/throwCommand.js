module.exports = {
    name: 'throw',
    help: 's?throw @user \nThrow people because yes',
    description: "THROW THINGS!",
    execute(message, client) {
        const throwSend = [
            'o', `blobs`, 'water bottles', 'fixed bots', 'EDHSIEfhawefkwhn3dWEFIHW$EPFIWrlcbskecbleajhdvwjkehdkjwehfglwrhfgioeuurgvw4hgWRFHPSRIGP#I$UR*#FY#*<H$C*H#ofh347fy3948yr4gf',
            'Kianu Reeves', 'jurigan', "charles' underwater car", "blob gaming's videos", "hello kitty",
            "UNIKITTY", "awesome best definitely not stolen burritos", "car batteries", "meow meow", "cats", "YORKY dogs",
            "waters", "SERERVEVRVV", "blobifying liquid", "everything is nothing", "neon particles", "puppies",
            "everything", "bots", "noooo ZI BEN YAAA", "popcorn", "unpopped popcorn", "cookies"
        ]
        const index = Math.floor(Math.random() * (throwSend.length)); 
        const user = message.mentions.users.first();
        if(!user) {
            const args = message.content.split(" ");
            const userName = args.slice(1).join(" ");
            if(!userName) {
                message.channel.send(`Throws **${throwSend[index]}** at a random blob`);
                return;
            }
            const guildMember = message.guild.members.cache.find(u => u.name == userName);
            message.channel.send(`Throws **${throwSend[index]}** at **${userName}**`);
            return;
        }
        const member = message.guild.members.cache.find(u => u.id == user.id);
        const name = member.displayName || member.username || member.author.username;
        const long = name.slice(Math.floor((90*name.length)/100));

        if(user.id === message.member.id) {
            message.channel.send(`THROW URSELF!`);
            return;
        }
        message.channel.send(`Throws **${throwSend[index]}** at **${name}**`);
        

    }
}