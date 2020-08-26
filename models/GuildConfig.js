const mongoose = require('mongoose');
const GuildConfigSchema = new mongoose.Schema({
    guildId: {
        type: String,
        required: true,
        unique: true
    },
    prefix: {
        type: String,
        required: true,
        default: 's?'
    },
    welcome: {
        type: String,
        required: false
    },
    muted: {
        type: String,
        required: false
    },
    defaultRole: {
        type: String,
        required: false
    },
    logs: {
        type: String,
        required: false
    },
    verify: {
        type: String,
        required: false
    },
    underage: {
        type: String,
        required: false
    },
    ticket_channel: {
        type: String,
        required: false
    },
    ticket_logs: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('GuildConfig', GuildConfigSchema);
