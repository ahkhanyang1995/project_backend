import { Schema, model } from "mongoose"
const PriceSchema =new Schema({
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
        type: Schema.Types.ObjectId,
        ref: 'Musuem'
      },
      status: {
        type: Boolean,
      }
},{timestamps: this})
const Price = model('Price',PriceSchema, 'Price')
export default Price