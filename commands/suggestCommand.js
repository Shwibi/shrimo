module.exports = {
    name: 'suggest',
    help: '<prefix>suggest <suggestion> \nSuggest something new to add to the bot :D',
    async execute(message, client) {
        const Suggestions = require('../models/Suggestions');
        const args = message.content.split(" ");
        if(!args[1]) return message.channel.send("We appreciate your thought, but please add a suggestion to suggest something or 'get' to get a suggestion you suggested before :sweat_smile:");
        const suggestion = args.slice(1).join(" ");
        const suggest = await Suggestions.create({
            userTag: message.author.tag,
            suggestion: suggestion,
            userId: message.author.id,
            timestamp: message.createdTimeStamp || message.createdTimestamp || null,
            messageId: message.id
        })
        message.channel.send(' :white_check_mark: | Successfully logged your suggestion, thanks for suggesting something! Please be patient for a few seconds while we fetch your application id... <3')
        setTimeout(async () => {
            const userSuggestion = await Suggestions.findOne({ messageId: message.id });
            if(!userSuggestion) {
                return message.channel.send(" :x: | Could not fetch suggestion id!");
            }
            const id = userSuggestion.get('_id');
            if(!id) {
                return message.channel.send(" :x: | Could not fetch suggestion id!");
            }
            const ID = userSuggestion.get('ObejctId');
            message.member.send("Here's your app id: " + id);
        }, 3000)
    }
}