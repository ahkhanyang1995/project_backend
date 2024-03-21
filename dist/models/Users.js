"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const usersSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    districtId: {
        type: String,
    },
    village: {
        type: String,
    },
    mobile: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Admin', 'User', 'Customer']
    },
    Dristrict: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Dristrict'
    }
}, { timestamps: true });
const Users = (0, mongoose_1.model)('Users', usersSchema, 'Users');
exports.default = Users;
