const mongoose = require('mongoose');
const GoldSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    guildId: {
        type: String,
        required: true
    },
    gold: {
        type: Number,
        required: true
    }
})
module.exports = mongoose.model('Gold', GoldSchema);