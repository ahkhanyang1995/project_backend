import { Schema, model } from "mongoose"
const Schdule_timesSchema =new Schema({
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
    type: Schema.Types.ObjectId,
    ref: 'Musuem'
  }
},{timestamps: this})
const Schdule_times = model('Schdule_times',Schdule_timesSchema, 'Schdule_times')
export default Schdule_times