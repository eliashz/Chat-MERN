const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required.'
    },
    email: {
        type: String,
        required: 'e-mail is required.'
    },
    password: {
        type: String,
        required: 'Password is required.'
    },
}, {
    timestamps: true
}, {
    
    versionKey: false
});

module.exports = mongoose.model('User', userSchema);