const express = require('express')
const router = express.Router()

router.get('/test', (req, res) => {
  try {
    return res.status(200).json({ success: true })
  } catch (err) {
    console.log(err)
    res.end()
  }
})

router.get('/index', (req, res) => {
  res.status(200).json({ success: true })
})

module.exports = router
