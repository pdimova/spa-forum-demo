'use strict';

const express = require('express');
const hasher = require('../utils/hasher')();
const authenticator = require('../utils/authenticator');

let router = express.Router();

const User = require('../models/user');

router.get('/', (req, res) => {
    User
        .find()
        .exec((error, results) => {
            if (error) {
                return;
            }

            let users = results.map(user => ({ username: user.username, id: user.id }));
            res.status(201).json({ 'result': users });
        });
});

router.post('/', (req, res, next) => {
    User
        .findOne({ username: req.body.username })
        .exec((error, user) => {
            if (error) {
                next(error);
                return;
            }

            if (user) {
                res.status(400).send({ 'result': { err: 'User already exists' } });
                return;
            }

            let newUser = new User({
                username: req.body.username,
                password: req.body.password
            });

            newUser.save((error, createdUser) => {
                if (error) {
                    next(error);
                    return;
                }

                res.status(201).json({ 'result': { username: createdUser.username } });
            });
        });
});

router.put('/auth', (req, res, next) => {
    User
        .findOne({ username: req.body.username })
        .exec((error, user) => {
            if (error) {
                next(error)
            }

            if (!user) {
                res.status(400).json({ result: { err: "Authentication failed. User not found." } });
            } else if (user) {
                //if password matches
                if (user.password !== hasher.hashPassword(req.body.password, user.salt)) {
                    res.status(400).json({ success: false, message: 'Authentication failed. Wrong password.' });
                    return;
                }

                let payload = { username: user.username, id: user.id };
                let token = authenticator.getToken(payload);
                // NOTE: dont give full info

                return res.status(200).json({ result: { username: user.username, token: token } });
            }
        });
});

module.exports = router;