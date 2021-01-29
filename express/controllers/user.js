const User = require('../models/user')

module.exports = {
  show: async (req, res) => {

    try {
      console.log("CONTROLLER SHOW FROM USER ASKED:::::::::::")
      // This controller sending User Data to /panel.js //
      const sessionUser = req.session.get('user')
      console.log("SSESSION USER ++++" , sessionUser)

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
      console.log("CONTROLELR UPDATE CALLED")
      const data = req.body
      const _id = req.params.id
      const user = await User.findOneAndUpdate({ _id }, data, { new: true })
      if (!user ) {
        return res.status(404).json({ success: false, message: { tr: "Kullanıcı Kaydı Bulunmuyor", en: "No user record"}})
      }
      console.log('user From Controller User :', user)


      res.status(200).json({ success: true , message: {tr: "Bilgiler Güncellendi", en: "Informatıon updated successfully"}})




    } catch (err) {
      console.error(err)
    }
  },
}
