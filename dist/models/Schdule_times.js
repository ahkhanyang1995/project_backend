"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Schdule_timesSchema = new mongoose_1.Schema({
    title: {
        type: String,
    },
    openDate: {
        type: String,
    },
    closeDate: {
        type: String,
    },
    capacty_limit: {
        type: String,
    },
    Musuem: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Musuem'
    }
}, { timestamps: this });
const Schdule_times = (0, mongoose_1.model)('Schdule_times', Schdule_timesSchema, 'Schdule_times');
exports.default = Schdule_times;
