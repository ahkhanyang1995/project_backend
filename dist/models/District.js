"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const districtSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    Province: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Province'
    }
}, { timestamps: this });
const District = (0, mongoose_1.model)('District', districtSchema, 'District');
exports.default = District;
