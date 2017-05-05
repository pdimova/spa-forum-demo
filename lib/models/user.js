'use strict';

const mongoose = require('mongoose');
const crypto = require('crypto');

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
    userMaterials: [{ title: String, category: String }]
});

userSchema.pre('save', function (next) {
    let user = this;
    user.salt = crypto.randomBytes(64).toString('hex');
    user.password = crypto.createHmac('sha512', user.salt).update(user.password).digest('hex');
    next();
});
// NOTE: Pre and post save() hooks are not executed on update(), findOneAndUpdate(), etc.
// TODO: Find way to update pass if user wants to change pass
// TODO: Hash the pass in client

const User = mongoose.model('User', userSchema);

module.exports = User;