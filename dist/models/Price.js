"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PriceSchema = new mongoose_1.Schema({
    type: {
        type: String,
    },
    adult: {
        type: Number,
    },
    child: {
        type: Number,
    },
    Musuem: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Musuem'
    },
    status: {
        type: Boolean,
    }
}, { timestamps: this });
const Price = (0, mongoose_1.model)('Price', PriceSchema, 'Price');
exports.default = Price;
