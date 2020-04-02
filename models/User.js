const mongoose = require('mongoose');
require('mongoose-type-email');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'Please add your first name.']
    },
    lastName: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'Please add your last name.']
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        unique: true
    },
    passwordHash: {
        type: String,
        minlength: 8,
        required: [true, 'Please add your password.']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.plugin(uniqueValidator);

UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      // the passwordHash should not be revealed
      delete returnedObject.passwordHash
    }
  })

module.exports = mongoose.model('User', UserSchema);