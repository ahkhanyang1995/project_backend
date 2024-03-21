import { Schema, model } from "mongoose"
const MusuemSchema =new Schema({
    contact: {
        type: String,
      },
      address: {
        type: String,
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      galleryId: [{
        type: Schema.Types.ObjectId,
        ref:'Gallery'
      }]
},{timestamps: this})
const Musuem = model('Musuem',MusuemSchema, 'Musuem')
export default Musuem