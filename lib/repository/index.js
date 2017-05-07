'use strict';

const User = require('../models/user');
module.exports = {
    users: require('./users')(User)
}