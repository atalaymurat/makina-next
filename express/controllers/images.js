const User = require('../models/user')
const fs = require('fs')
const path = require('path')
const { session } = require('passport')
const gm = require('gm').subClass({ imageMagick: true })

const makeDir = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pathDir = path.join(__dirname, `../../public/avatars/${name}`)
      const exists = fs.existsSync(pathDir)
      console.log('IS PATH EXISTS:', name, exists)
      if (!exists) {
        fs.mkdir(pathDir, (err) => {
          if (err) throw err
          console.log('DIR CREATED', name)
          resolve()
        })
      } else {
        console.log('DIR ALREADY EXISTS', name)
        resolve()
      }
    } catch (err) {
      console.error('DIR CREATE SERVER ERROR:', name)
      reject(err)
    }
  })
}

module.exports = {
  index: (req, res, next) => {},
  create: async (req, res, next) => {
    try {
      const file = req.file
      const sessionUser = req.session.get('user')
      if (!sessionUser) return res.status(403).end()
      const _id = sessionUser._id

      const user = await User.findById(_id)
      // Remove extension .jpeg and return original filename
      let fileName = file.originalname.split('.')
      fileName.pop()
      fileName.join('')

      await makeDir(user._id)

      console.log('CREATE IMAGES CTRL FILE ::', file)
      const dest = path.join(
        __dirname,
        `/../../public/avatars/${user._id}/${fileName}.webp`
      )
      // Resize without croping
      const resizeImage = (pth, dst) => {
        return new Promise((res, rej) => {
          try {
            gm(pth)
              .resize(200, 200)
              .background('#FFFFFF')
              .gravity('Center')
              .extent(200, 200)
              .write(dst, function (err) {
                if (err) rej(err)
                console.log('FILE WRITTEN TO AVATARTS')
                console.log(dest)
                fs.unlinkSync(file.path)
                res()
              })
          } catch (err) {
            rej(err)
          }
        })
      }
      await resizeImage(file.path, dest)

      const newImage = { value: dest.split('public')[1] }
      user.photos.unshift(newImage)
      await user.save()

      res.json({ success: true })
    } catch (err) {}
  },
}
