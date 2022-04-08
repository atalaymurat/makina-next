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
    const sessionUser = req.session.get('user')
    if (!sessionUser) return res.status(403)
    console.log(req.body)

    try {
      if (!req.body.name || !req.body.label) {
        res.status(400).json({ success: false, error: 'missing fields' })
        return
      }
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
      console.log('Brand Update Controler incoming body', req.body)
      const sessionUser = req.session.get('user')
      if (!sessionUser) return res.status(403)
      const brd = await Brand.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
      console.log('Brand UPDATE :', brd)
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
      const sessionUser = req.session.get('user')
      if (!sessionUser) return res.status(403)
      const id = req.params.id
      // İlerde baglantıları da bulup temizlemek gerekecek
      await Brand.findByIdAndDelete(id)
      console.log("Brand deleted", id)
      res.end()
    } catch (err) {
      res.status(400).json({ success: false, error: 'Error on deleting brand' })
    }
  },
}
