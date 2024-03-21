"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BookingSchema = new mongoose_1.Schema({
    bookingId: {
        type: String,
    },
    status: {
        type: String,
    },
    bookDate: {
        type: String,
    },
    type: {
        type: String,
    },
    price: {
        type: Number,
    },
    adult: {
        type: Boolean,
    },
    child: {
        type: Boolean,
    },
    CustomerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    MusuemId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Musuem'
    }
}, { timestamps: this });
const Booking = (0, mongoose_1.model)('Booking', BookingSchema, 'Booking');
exports.default = Booking;
