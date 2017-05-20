'use strict';

const hasher = require('../utils/hasher')();

const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    salt: {
        type: String,
        require: true
    },
    userMaterials: []
});

userSchema.pre('save', function (next) {
    let user = this;
    if (!this.isModified('password') || this.isNew) {
        user.salt = hasher.generateSalt();
        user.password = hasher.hashPassword(user.password, user.salt);
        next();
    }
});
// NOTE: Pre and post save hooks are not executed on update(), findOneAndUpdate(), etc.
// TODO: Find way to update pass if user wants to change pass
// TODO: Hash the pass in client

const User = mongoose.model('User', userSchema);

module.exports = User;