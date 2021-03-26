const Discord = require('discord.js');

module.exports = {
    name: 'gold',
    help: '<prefix>gold | <prefix>gold @user | <prefix>gold board \nView gold and ranks in your server!',
    async execute(message, client) {


        const args = message.content.split(" ");

        const Gold = require('../../models/Gold');
        const user = message.mentions.users.first();
        const { emoji, theme } = require('../../config/config.json');
        const themes = require('../../config/themes.json');
        const indexLine = Math.floor(Math.random() * themes[theme].lines.length);

        await Gold.find({ guildId: message.guild.id }).sort([['gold', 'descending']]).exec(async (err, res) => {

            if (err) console.log(err);



            if (!args[1]) {
                message.channel.startTyping();

                for (let i = 0; i < res.length; i++) {

                    if (res[i].userId == message.author.id) {
                        const embed = {
                            author: {
                                name: message.author.tag,
                                icon_url: message.author.displayAvatarURL()
                            },
                            title: "Gold Card",
                            description: `Gold: ${res[i].gold} | Rank: ${i + 1}`,
                            color: themes[theme].color.json
                        };
                        message.channel.send({ embed: embed }).then(message.channel.stopTyping());

                    }
                }
            }
            else if (user) {
                const guildUser = message.guild.members.cache.find(m => m.id == user.id);
                message.channel.startTyping();
                for (let i = 0; i < res.length; i++) {
                    if (res[i].userId == user.id) {
                        const embed = {
                            author: {
                                name: guildUser.author.tag,
                                icon_url: guildUser.author.displayAvatarURL()
                            },
                            title: "Gold Card",
                            description: `Gold: ${res[i].gold} | Rank: ${i + 1}`,
                            color: themes[theme].color.json
                        };
                        message.channel.send({ embed: embed }).then(message.channel.stopTyping());

                    }
                }
            }
            else if (args[1] == 'board') {
                message.channel.startTyping();
                let embed = new Discord.MessageEmbed()
                    .setTitle("Leaderboards")
                    .setThumbnail(message.guild.iconURL())

                if (res.length === 0) {
                    embed.setColor("RED");
                    embed.addField("No data found", "Please type in chat to get gold");
                }
                else if (res.length < 10) {
                    embed.setColor(themes[theme].side_color.hex);
                    for (let i = 0; i < res.length; i++) {
                        let member = message.guild.members.cache.find(u => u.id == res[i].userId);
                        let name = member.user.username || "User Left";
                        embed.addField(`${i + 1}. ${name} | **ID:** ${res[i].userId}`, `**Gold:** ${res[i].gold}`);

                    }
                }
                else {

                    embed.setColor(themes[theme].color.hex);
                    for (let i = 0; i < 10; i++) {
                        let member = message.guild.members.cache.find(u => u.id == res[i].userId);
                        let name;
                        if (!member) name = "`[User Left]`";
                        else name = member.user.username
                        embed.addField(`${i + 1}. ${name} | **ID:** ${res[i].userId}`, `**Gold:** ${res[i].gold}`);

                    }
                }

                message.channel.send(embed).then(message.channel.stopTyping());
            }


        });



    }
}