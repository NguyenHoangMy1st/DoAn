import mongoose, { Schema } from 'mongoose'

const BrandSchema = new Schema({
  name: String,
  description: String,
  image: String,
})

export const BrandModel = mongoose.model('brands', BrandSchema)
