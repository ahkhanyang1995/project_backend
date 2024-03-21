"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const provinceSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    isDelete: {
        type: Boolean,
        default: false
    }
}, { timestamps: this });
const Province = (0, mongoose_1.model)('Pronvice', provinceSchema, 'Pronvice');
exports.default = Province;
