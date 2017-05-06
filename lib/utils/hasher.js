'use strict';

const crypto = require('crypto');

const ENCODING = 'hex';
const ALGORITHM = 'sha512';

module.exports = () => ({
    generateSalt() {
        return crypto.randomBytes(64).toString(ENCODING);
    },

    hashPassword(password, salt) {
        return crypto.createHmac(ALGORITHM, salt).update(password).digest(ENCODING)
    }
});