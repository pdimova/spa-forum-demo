'use strict';

const mongoose = require('mongoose');
const materialSchema = mongoose.Schema({

    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    img: { type: String },
    commentsCount: {
        type: Number,
        default: 0
    },
    user: {
        id: mongoose.Schema.Types.ObjectId,
        username: {
            type: String,
            require: true
        }
    }
});
materialSchema.set('timestamps', true); // If set timestamps, mongoose assigns createdAt and updatedAt fields to your schema, the type assigned is Date.

const Material = mongoose.model('Material', materialSchema);

module.exports = Material;