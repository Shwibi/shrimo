module.exports = {
    name: "dm",
    help: 's?dm @user \nDm a message to a user!',
    execute(message, client) {
        message.delete();
        if(!message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.send("No.");
            return;
        }
        const user = message.mentions.users.first();
        if(!user) {
            message.channel.send('Mention a user to dm, please, thank.');
            return;
        }
        if(user.id == message.member.id) {
            message.channel.send("Why do you wanna dm yourself? Just think what you wanna think to yourself! Smh");
            return;
        }
        const search = message.guild.members.cache.find(u => u.id == user.id);
        if(!search) {
            message.channel.send("That user doesn't even exist in this server! LOL");
            return;
        }
        const args = message.content.split(" ");
        const msg = args.slice(2).join(" ");
        search.send(msg);
        message.member.send(msg);
        const d = new Date();
        message.member.send("This message was sent to user " + user.username + " on " + d);
    }
}