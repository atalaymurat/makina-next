const mongoose = require('mongoose')
const treePlugin = require('mongoose-tree-materialized')

const Schema = mongoose.Schema

const categorySchema = new Schema({
  name: { tr: String, en: String },
})

categorySchema.plugin(treePlugin)

const Category = mongoose.model('category', categorySchema)

module.exports = Category
