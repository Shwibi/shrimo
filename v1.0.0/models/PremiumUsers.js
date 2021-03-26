const mongoose = require('mongoose');
const PremiumUsersSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    userTag: {
        type: String,
        required: true,
        unique: true
    },
    userGuilds: {
        type: Array,
        required: false
    }
})
module.exports = mongoose.model('PremiumUsers', PremiumUsersSchema)