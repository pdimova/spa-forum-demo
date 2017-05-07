'use strict';

const User = require('../models/user');
const Material = require('../models/material');

module.exports = {
    users: require('./users')(User),
    materials: require('./materials')(Material)
}