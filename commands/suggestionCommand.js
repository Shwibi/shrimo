const { execute } = require("./suggestCommand");

module.exports = {
    name: 'suggestion',
    help: '<prefix>suggestion <id> \nGet your suggestion from your suggestion id!',
    async execute(message, client) {
        const Suggestions = require('../models/Suggestions');
        const args = message.content.split(" ");
        const suggestionID = args[1];
        if(!args[1]) return message.channel.send("Please mention the ID of your suggestion to search!");
        const suggestionValve = await Suggestions.findOne({ _id: suggestionID});
        const sugUser = suggestionValve.get('userId');
        if(userId == message.author.id) {
            if(!suggestionValve) return message.channel.send("No suggestion found!");
            const suggestion = await suggestionValve.get('suggestion');
            message.channel.send("<:info:747755288261558285> | " + suggestion);
        }
        else {
            message.channel.send("No suggestion found!");
        }

        
    }
}