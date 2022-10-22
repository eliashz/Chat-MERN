const mongoose = require('mongoose');

const chatroomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required.'
    },
    messages: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: 'User is required.',
            ref: 'User'
        },
        name: {
            type: String,
            required: 'Name is required'

        },
        text: {
            type: String,
            required: 'Message is required'
        },
        date: { type: Date, default: Date.now },
    }]
    }, {
        versionKey: false
});

module.exports = mongoose.model('Chatroom', chatroomSchema);