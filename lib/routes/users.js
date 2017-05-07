'use strict';

const hasher = require('../utils/hasher')();
const authenticator = require('../utils/authenticator');
//const validator = require('../utils/validator');

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
                    res.status(400).json({ result: { err: 'User already exists' } });
                    return Promise.reject();
                }

                // if (!validator.isValidUser(user)) {
                //     res.status(400).json({ result: { err: "Invalid user" } });
                //     return;
                // }

                return userData.createUser(user.username, user.password);
            })
            .then(createdUser => {

                // TODO: Mapper
                let userShortInfo = { username: createdUser.username };
                res.status(201).json({ result: userShortInfo });
            })
            .catch(error => {
                // mongoose throws not-catched error for uniqie usernames
                //next(error);
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
                    //if password does not match
                    if (dbUser.password !== hasher.hashPassword(user.password, dbUser.salt)) {
                        res.status(400).json({ success: false, message: 'Authentication failed. Wrong password.' });
                        return;
                    }

                    let payload = { id: dbUser.id, username: dbUser.username };
                    let token = authenticator.getToken(payload);
                    // NOTE: dont give full info

                    // TODO: Mapper
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