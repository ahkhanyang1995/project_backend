"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GallerySchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }
}, { timestamps: this });
const Gallery = (0, mongoose_1.model)('Gallery', GallerySchema, 'Gallery');
exports.default = Gallery;
