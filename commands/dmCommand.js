module.exports = {
    name: "dm",
    help: 's?dm @user \nDm a message to a user!',
    execute(message, client) {
        message.delete();
        if(!message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.send("<a:no:748782299667234966> | No.");
            return;
        }
        const user = message.mentions.users.first();
        if(!user) {
            message.channel.send('<a:no:748782299667234966> | Mention a user to dm, please, thank.');
            return;
        }
        if(user.id == message.member.id) {
            message.channel.send("<a:no:748782299667234966> | Why do you wanna dm yourself? Just think what you wanna think to yourself! Smh");
            return;
        }
        const search = message.guild.members.cache.find(u => u.id == user.id);
        if(!search) {
            message.channel.send("<a:no:748782299667234966> | That user doesn't even exist in this server! LOL");
            return;
        }
        const args = message.content.split(" ");
        const msg = args.slice(2).join(" ");
        search.send(msg);
        const d = new Date();

        if(message.guild.id != '746213635336044665') return;
        
        const dm_ch = client.channels.cache.get('746934028560498740');
        const embed = {
            author: {
                name: search.user.username || user.username,
                icon_url: user.displayAvatarURL()
            },
            title: "DM sent",
            description: `Author ID: ${user.id}`,
            fields: [
                {
                    name: "Content",
                    value: msg
                },
                {
                    name: "Details",
                    value: "This message was sent to user " + user.username + " on " + `${d.getDate()} date ${d.getMonth()} month`
                }
            ]
        }
        dm_ch.send({ embed: embed });
    }
}