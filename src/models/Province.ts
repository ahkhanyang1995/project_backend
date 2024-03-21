import { Schema, model } from "mongoose"
const provinceSchema = new Schema({
  name: {
    type: String,
  },
  isDelete: {
    type: Boolean,
    default: false
  },
  sortOrder: {
    type: Number,
    default: 0
  }
}, { timestamps: this })
const Province = model('Province', provinceSchema, 'Province')
export default Province