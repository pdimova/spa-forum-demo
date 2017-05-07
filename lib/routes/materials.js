'use strict';

const authenticator = require('../utils/authenticator');

const express = require('express');
let router = express.Router();

const Material = require('../models/material');

router.get('/', (req, res, next) => {
    let filter = req.query.filter || '';

    Material
        .find({
            title: { $in: [filter] },
            description: { $in: [filter] },
            user: { username: { $in: [filter] } }
        })
        .sort('createdAt')
        .exec((error, dbMaterials) => {
            if (error) {
                next(error);
            }

            // Map materials
            let materials = dbMaterials.map(material => ({
                id: material.id,
                title: material.title,
                description: material.description,
                createdAt: material.createdAt,
                img: material.img,
                commentsCount: material.comments.length,
                user: {
                    id: material.user.id,
                    username: material.user.username
                }
            }));

            res.status(200).json({ 'result': materials });
        });
});

router.post('/', authenticator.authenticationMiddleware, (req, res, next) => {

    Material
        .create({
            title: req.body.title,
            description: req.body.description,
            img: req.img || "https://bitstorm.org/edwin/jquery-presentatie/pix/jquery_logo_color_onwhite.png",
            user: {
                id: req.decoded.id,
                username: req.decoded.username
            }
        },
        (error, dbMaterial) => {
            if (error) {
                next(error);
            }

            // Map materials
            let material = {
                id: dbMaterial.id,
                title: dbMaterial.title,
                description: dbMaterial.description,
                createdAt: dbMaterial.createdAt,
                img: dbMaterial.img,
                commentsCount: dbMaterial.comments.length,
                user: {
                    id: dbMaterial.user.id,
                    username: dbMaterial.user.username
                },
                comments: dbMaterial.comments
            };

            res.status(200).json({ 'result': material });
        });


});

router.get('/:id', (req, res, next) => {
    let id = req.params.id;

    Material
        .findById(id)
        .exec((error, dbMaterial) => {
            if (error) {
                next(error);
            }

            // Map materials
            let material = {
                id: dbMaterial.id,
                title: dbMaterial.title,
                description: dbMaterial.description,
                createdAt: dbMaterial.createdAt,
                img: dbMaterial.img,
                commentsCount: dbMaterial.comments.length,
                user: {
                    id: dbMaterial.user.id,
                    username: dbMaterial.user.username
                },
                comments: dbMaterial.comments
            };

            res.status(200).json({ 'result': material });
        });
});

router.put('/:id/comments', authenticator.authenticationMiddleware, (req, res, next) => {
    let id = req.params.id;

    let comment = {
        text: req.body.commentText,
        user: {
            id: req.decoded.id,
            username: req.decoded.username
        }
    };
    Material
        .findByIdAndUpdate(id, { $push: { comments: comment } }, { new: true })
        .exec((error, dbMaterial) => {
            if (error) {
                next(error);
            }

            // Map materials
            let material = {
                id: dbMaterial.id,
                title: dbMaterial.title,
                description: dbMaterial.description,
                createdAt: dbMaterial.createdAt,
                img: dbMaterial.img,
                commentsCount: dbMaterial.comments.length,
                user: {
                    id: dbMaterial.user.id,
                    username: dbMaterial.user.username
                },
                comments: dbMaterial.comments
            };

            res.status(200).json({ 'result': material });
        });
});

module.exports = router;