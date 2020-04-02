const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please add your first name.']
    },
    lastName: {
        type: String,
        required: [true, 'Please add your last name.']
    },
    email: {
        type: String,
        required: [true, 'Please add your email.']
    },
    password: {
        type: String,
        required: [true, 'Please add your password.']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);