import { Schema, model } from "mongoose"
const districtSchema =new Schema({
    name: {
        type: String,
      },
      provinceId: {
        type: Schema.Types.ObjectId,
        ref: 'Province'
      }
},{timestamps: this})
const District = model('District',districtSchema, 'District')
export default District