const Category = require('../models/category')
const _ = require('lodash')

const byName = (name) => (cat) =>
  name.toLowerCase() === cat.name.substr(0, name.length).toLowerCase()

module.exports = {
  show: async (req, res, next) => {
    try {
      const categories = await Category.find()
      res.status(200).json(categories.filter(byName(req.params.name)))
    } catch (err) {
      res
        .status(404)
        .send({ error: 'there is an error on categories show controller' })
    }
  },
  index: async (req, res, next) => {
    console.log('categories İndex api')
    const cat = await Category.find()
    const categories = cat.map((item) => {
      return {
        _id: item._id,
        depth: item.depth,
        name: item.name,
        parentId: item.parentId,
        path: item.path,
      }
    })
    res.status(200).json(categories)
  },
  create: async (req, res, next) => {
    try {
      let data = {
        name: req.body.name,
        parentId: null,
      }
      let cat = new Category(data)
      if (req.body.parent) {
        const prt = await Category.findOne({ _id: req.body.parent })
        cat.parentId = prt ? prt._id : null
      }
      await cat.save()
      const findCat = await Category.findOne({ _id: cat._id })
      const category = {
        name: findCat.name,
        parentId: findCat.parentId,
        path: findCat.path,
        depth: findCat.depth,
        _id: findCat._id,
      }
      res.status(200).json({ success: true, category })
    } catch (err) {
      res.status(400).json({
        success: false,
        error: 'There is an Error while creating Category',
      })
    }
  },
  update: async (req, res, next) => {
    try {
      const cat = await Category.findOne({ _id: req.params.id })
      cat.name = req.body.name
      cat.parentId = req.body.parentId || null
      await cat.save()
      res.status(200).json({ success: true, cat })
    } catch (err) {
      res.status(400).json({
        success: false,
        error: 'There is an error on updating category',
      })
    }
  },
  tree: async (req, res, next) => {
    console.log("Tree Controller at Categories")
    // Burda kategori kaydı yok ise hata veriyor düzeltme gerekli
    const cat = await Category.find()
    if (cat.length === 0 ) {
      console.log("ERROR: There is no category in the list please be sure to add some cats")
      res.end()
    }

    const fullTree = await Category.GetFullArrayTree()
    res.status(200).json({ success: true, tree: fullTree })
  },
  destroy: async (req, res, next) => {
    try {
      await Category.findOne({ _id: req.params.id }, function (err, doc) {
        doc.getChildren(function (err, docs) {
          if (docs.length) {
            docs.map(async (cat) => {
              await Category.deleteOne({ _id: cat._id })
            })
          } else {
            return
          }
        })
      })
      await Category.deleteOne({ _id: req.params.id })
      res.status(200).json({ success: true })
    } catch (err) {
      res
        .status(400)
        .json({ success: false, error: 'Error on deleting category' })
    }
  },
}
