import { Schema, model } from "mongoose"
const BookingSchema = new Schema({
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
    type: Schema.Types.ObjectId,
    ref: 'Customer'
  },
  MusuemId: {
    type: Schema.Types.ObjectId,
    ref: 'Musuem'
  }
}, { timestamps: this })
const Booking = model('Booking', BookingSchema, 'Booking')
export default Booking
