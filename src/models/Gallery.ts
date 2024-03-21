import { Schema, model } from "mongoose"
const GallerySchema =new Schema({
  title: {
    type: String,
    required: true
  },
  detail: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  }
},{timestamps: this})
const Gallery = model('Gallery',GallerySchema, 'Gallery')
export default Gallery