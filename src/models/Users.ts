import { Schema, model } from 'mongoose'
const usersSchema = new Schema({
  name: {
    type: String,
  },
  
  village: {
    type: String,
  },
  mobile: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  status: {
    type: String,
    enum:['Admin','User','Customer']
  },
  districtId: {
    type: Schema.Types.ObjectId,
    ref: 'District'
  }
}, { timestamps: true })
const Users = model('Users', usersSchema, 'Users')
export default Users