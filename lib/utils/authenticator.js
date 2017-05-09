'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = {
    getToken(payload) {
        return jwt.sign(payload, config.secret, { expiresIn: config.expirationTime });
    },

    authenticationMiddleware(req, res, next) {
        let token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
                    next(new Error('invalid_token'));
                    return;
                }

                req.user = decoded;
                next();
            });
        } else { //if no token
            res.status(403).json({ success: false, message: 'No token provided.' });
            next(new Error('No token provided'));
            return;
        }
    }
}