'use strict';

const authenticator = require('../utils/authenticator');

const Material = require('../models/material');

module.exports = (materialData) => {

    const express = require('express');
    let router = express.Router();

    router.get('/', (req, res, next) => {
        let filter = req.query.filter;

        materialData
            .getAllMaterials(filter)
            .then(dbMaterials => {

                // TODO: Mapper
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

                res.status(200).json({ result: materials });

            })
            .catch(error => {
                next(error);
            });
    });

    router.post('/', authenticator.authenticationMiddleware, (req, res, next) => {
        let title = req.body.title;
        let description = req.body.description;
        let img = req.body.img;

        // Validate title, description, img

        let user = {
            id: req.decoded.id,
            username: req.decoded.username
        }

        materialData
            .createMaterial(title, description, img, user)
            .then(dbMaterial => {

                // TODO: Mapper
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

                res.status(200).json({ result: material });
                // return userData.save
            })
            .catch(error => {
                next(error);
            });
    });

    router.get('/:id', (req, res, next) => {
        let id = req.params.id;

        materialData
            .getMaterialById(id)
            .then(dbMaterial => {

                // TODO: Mapper
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

                res.status(200).json({ result: material });
            })
            .catch(error => {
                next(error);
            });
    });

    router.put('/:id/comments', authenticator.authenticationMiddleware, (req, res, next) => {
        let id = req.params.id;
        let commentText = req.body.commentText;
        let user = {
            id: req.decoded.id,
            username: req.decoded.username
        }

        // Validate commentText

        materialData
            .addCommentToMaterial(id, commentText, user)
            .then(dbMaterial => {

                // TODO: Mapper
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

                res.status(200).json({ result: material });
            })
            .catch(error => {
                next(error);
            });

    });

    return router;
}