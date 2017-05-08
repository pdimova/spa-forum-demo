'use strict';

const hasher = require('../utils/hasher')();
const authenticator = require('../utils/authenticator');
const validator = require('../utils/validator');

module.exports = (userData) => {
    const express = require('express');
    let router = express.Router();

    router.get('/', (req, res, next) => {
        userData
            .getAllUsers()
            .then(dbUsers => {

                // TODO: Mapper
                let users = dbUsers.map(u => ({ id: u.id, username: u.username }));

                res.status(201).json({ result: users });
            })
            .catch(error => {
                next(error);
            });
    });

    router.post('/', (req, res, next) => {
        let user = req.body;

        userData
            .getUserByUsername(user.username)
            .then(dbUser => {
                if (dbUser) {
                    res.status(400).json({ result: { err: 'User already exists.' } });
                    return Promise.reject(new Error('User already exists.')); // skips the next then and pass error object to next()
                }

                if (!validator.users.isValidUsername(user.username) || !validator.users.isValidPassword(user.password)) {
                    res.status(400).json({ result: { err: "Invalid username or password." } });
                    return Promise.reject(new Error('Invalid username or password.'));
                }

                return userData.createUser(user.username, user.password);
            })
            .then(createdUser => {

                // TODO: Mapper
                let userShortInfo = { username: createdUser.username };
                res.status(201).json({ result: userShortInfo });
            })
            .catch(error => {
                // to call next here, if(user) should not send response or error handler middleware should check if the the headers are sent
                next(error);
            });
    });

    router.put('/auth', (req, res, next) => {
        let user = req.body;

        userData
            .getUserByUsername(user.username)
            .then(dbUser => {
                if (!dbUser) {
                    res.status(400).json({ result: { err: "Authentication failed. User not found." } });
                    return;
                }

                if (dbUser) {
                    if (dbUser.password !== hasher.hashPassword(user.password, dbUser.salt)) {   //if password does not match
                        res.status(400).json({ success: false, message: 'Authentication failed. Invalid username or password.' });
                        return;
                    }

                    let payload = { id: dbUser.id, username: dbUser.username };
                    let token = authenticator.getToken(payload);
                    // NOTE: dont give full info

                    // TODO: Mapper - try mongoose projection
                    let userShortInfo = { username: dbUser.username, token: token };

                    res.status(200).json({ result: userShortInfo });
                }
            })
            .catch(error => {
                next(error);
            });
    });

    return router;
}