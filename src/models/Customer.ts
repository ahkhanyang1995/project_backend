import { Schema, model } from "mongoose"
const CustomerSchema =new Schema({
    profile: {
        type: String,
      },
      name: {
        type: String,
      },
      phone: {
        type: String,
      },
      
    districtId: {
        type: Schema.Types.ObjectId,
        ref: 'District'
      },
      village: {
        type: String,
      },
     userId : {
        type: Schema.Types.ObjectId,
        ref: 'Users'
      }
},{timestamps: this})
const Customer = model('Customer',CustomerSchema, 'Customer')
export default Customer