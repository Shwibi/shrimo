const mongoose = require('mongoose');
const SuggestionSchema = new mongoose.Schema({
    userTag: {
        type: String,
        required: true
    },
    suggestion: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        required: false
    },
    messageId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Suggestions', SuggestionSchema);