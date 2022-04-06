const Brand = require('../models/brand')
const _ = require('lodash')

module.exports = {
  show: async (req, res, next) => {
    try {
      const brands = await Brand.find()
      res.status(200).json(brands)
    } catch (err) {
      res
        .status(404)
        .send({ error: 'there is an error on categories show controller' })
    }
  },
  index: async (req, res, next) => {
    try {
      console.log('brands İndex api')
      const brands = await Brand.find()
      res.status(200).json(brands)
    } catch (err) {
      res
        .status(400)
        .json({ success: false, error: 'There is an Error Indexing Brands' })
    }
  },
  create: async (req, res, next) => {
    console.log(req.body)
    try {
      let data = req.body

      let brd = new Brand(data)
      await brd.save()
      res.status(200).json({ success: true, brd })
    } catch (err) {
      res.status(400).json({
        success: false,
        error: 'There is an Error while creating Brand',
      })
    }
  },
  update: async (req, res, next) => {
    try {
      const brd = await Brand.findOne({ _id: req.params.id })
      brd = req.body
      await brd.save()
      res.status(200).json({ success: true, brd })
    } catch (err) {
      res.status(400).json({
        success: false,
        error: 'There is an error on updating brand',
      })
    }
  },
  destroy: async (req, res, next) => {
    try {
      res.end()
    } catch (err) {
      res
        .status(400)
        .json({ success: false, error: 'Error on deleting brand' })
    }
  },
}
