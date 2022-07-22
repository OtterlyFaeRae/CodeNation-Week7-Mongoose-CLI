const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
        unique: true
    },
    episodes: {
        type: Number,
        required: true
    }, 
    seasons: {
        type: Number,
        default: 1
    }
});

const Show = mongoose.model('show', showSchema);

module.exports = Show;