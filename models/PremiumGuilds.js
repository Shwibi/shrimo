const mongoose = require('mongoose');
const PremiumGuildsSchema = new mongoose.Schema({
    guildId: {
        type: String,
        required: true,
        unique: true
    },
    guildName: {
        type: String,
        required: false
    },
    userPermits: {
        type: Array,
        required: false
    }
})

module.exports = mongoose.model('PremiumGuilds', PremiumGuildsSchema);