const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    userTag: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    guildId: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Tickets', TicketSchema);