'use strict';

const express = require('express');

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

module.exports = router;