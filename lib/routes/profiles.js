'use strict';

const express = require('express');
let router = express.Router();

const User = require('../models/user');

router.get('/:username', (req, res, next) => {
    User
        .findOne({ username: req.params.username })
        .exec((error, dbUser) => {
            if (error) {
                next(error)
            }

            let user = {
                username: dbUser.username,
                id: dbUser.id,
                userMaterials: dbUser.userMaterials
            };

            res.status(200).json({ 'result': user });
        });
});

module.exports = router;