"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CustomerSchema = new mongoose_1.Schema({
    profile: {
        type: String,
    },
    name: {
        type: String,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    Dristrict: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Dristrict'
    },
    village: {
        type: String,
    },
    User: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: this });
const Customer = (0, mongoose_1.model)('Customer', CustomerSchema, 'Customer');
exports.default = Customer;
