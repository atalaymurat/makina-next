const mongoose = require('mongoose')
const Schema = mongoose.Schema

const brandSchema = new Schema({
  name: String,
  label: String,
  logo: { type: String },
})

const Brand = mongoose.model('brand', brandSchema)

module.exports = Brand
