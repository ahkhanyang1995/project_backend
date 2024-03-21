import { Schema, model } from "mongoose"
const PaymentSchema =new Schema({
    payType: {
        type: String,
      },
      bankId: {
        type: String,
      },
      amount: {
        type: Number,
      },
      bookingId: {
        type: Schema.Types.ObjectId,
        ref: 'booking'
      }
},{timestamps: this})
const Payment = model('Payment',PaymentSchema, 'Payment')
export default Payment