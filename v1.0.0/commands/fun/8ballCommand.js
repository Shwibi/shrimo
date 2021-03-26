module.exports = {
    name: '8ball',
    help: '<prefix>8ball <question> \nAsk a question roll the 8ball!',
    async execute(message, client) {

        const themes = require('../../config/themes.json');
        const indexLine = Math.floor(Math.random() * themes[theme].lines.length);
        const { theme } = require('../../config/config.json');

        const possible = [
            'I think not', 'Possible', 'Definitely NOT', 'All signs say YES!', 'Oh heck no',
            'Possible, also not', 'Maybe?', 'I think so', 'A humble no :)', '100% not',
            'Alright.', 'Ask me later', 'In a minute, probably', 'No no no'
        ]
        const question = message.content.split(" ").slice(1).join(" ");
        if (!question) return message.channel.send("<a:no:748782299667234966> | Please ask a question");
        const index = Math.floor(Math.random() * possible.length);
        const embed = {
            author: {
                name: client.user.username,
                icon_url: client.user.displayAvatarURL()
            },
            title: '8ball | ' + themes[theme].title,
            color: themes[theme].side_color.json,
            fields: [
                {
                    name: "Question",
                    value: question
                },
                {
                    name: "8Ball",
                    value: possible[index]
                }
            ]
        };
        message.channel.send({ embed: embed });

    }
}