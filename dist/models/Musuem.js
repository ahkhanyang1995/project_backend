"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MusuemSchema = new mongoose_1.Schema({
    contact: {
        type: String,
    },
    address: {
        type: String,
    },
    User: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    GalleryId: [{
            type: mongoose_1.Schema.Types.ObjectId,
        }]
}, { timestamps: this });
const Musuem = (0, mongoose_1.model)('Musuem', MusuemSchema, 'Musuem');
exports.default = Musuem;
