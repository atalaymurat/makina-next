const User = require('../models/user')
const _ = require('lodash')

module.exports = {
  show: async (req, res) => {
    try {
      console.log('CONTROLLER SHOW FROM USER ASKED:::::::::::')
      // This controller sending User Data to /panel.js //
      const sessionUser = req.session.get('user')
      console.log('SSESSION USER ++++', sessionUser)

      // Burda eger cookie user silinmisse ve cookie duruyorsa hataya geçiyor
      const id = req.params.id
      if (!sessionUser) {
        return res.end()
      }

      const userDb = await User.findById(sessionUser._id)
      // We sent User to Panel Page as Providers firstName LastName
      if (!userDb) {
        return res.status(404).end()
      }
      const user = {
        ...userDb._doc,
        // Overwrighting user objects name virtual
        provider: sessionUser.provider,
      }
      console.log('USER SENT FROM SERVER', user)

      return res.status(200).json(user)
    } catch (err) {
      console.error('Server Error', err)
    }
  },
  update: async (req, res) => {
    try {
      console.log('CONTROLELR UPDATE CALLED')
      const sessionUser = req.session.get('user')
      if (!sessionUser) return res.status(403).end()
      const data = _.pick(req.body, ['name', 'phone.mobile', 'phone.company'])
      console.log('DATA REQ BODY PICKED ::::', data)

      const _id =
        sessionUser._id === req.params.id ? sessionUser._id : undefined
      const user = await User.findOneAndUpdate({ _id }, data, { new: true })
      if (!user) {
        return res.status(404).json({
          success: false,
          message: { tr: 'Kullanıcı Kaydı Bulunmuyor', en: 'No user record' },
        })
      }
      console.log('user From Controller User :', user)

      res.status(200).json({
        success: true,
        message: {
          tr: 'Bilgiler Güncellendi',
          en: 'Information updated successfully',
        },
      })
    } catch (err) {
      console.error(err)
    }
  },

  changePass: async (req, res, next) => {
    try {
      const sessionUser = req.session.get('user')
      if (!sessionUser) return res.status(403).end()
      const { currentPassword, newPassword } = req.body

      const user = await User.findById(sessionUser._id)
      console.log('USER FIND TO CHANGE PASS:', sessionUser._id)
      if (!user || !user.local.email) return res.status(403).end()
      console.log('USER CHECKED FOR LOCAL EMAIL:', user.local.email)

      const isMatched = await user.isValidPassword(currentPassword)
      console.log("IS MATCH CHECK : ", isMatched)
      if (!isMatched) {
        return res.status(406).json({
          success: false,
          message: { tr: 'Mevcut şifre yanlış', en: 'Current password wrong' },
        })
      }
      if (isMatched) {
        console.log('USER MATCH CHECK SUCCESS:', isMatched)
        user.local.password = newPassword
        user.local.passChanged = new Date()
        await user.save()
        console.log('USER PASS CHANGED:')
        return res.status(200).json({
          success: true,
          message: { tr: 'Şifre değiştirildi', en: 'Password changed' },
        })
      }
      res.end()
    } catch (err) {
      console.error(err)
    }
  },
}
