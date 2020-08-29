const mongoose = require('mongoose');
const EconomySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    money: {
        type: Number,
        required: true
    },
    storage: {
        type: Array,
        required: false
    }
})
module.exports = mongoose.model('Economy', EconomySchema);