const User = require('../models/user')

module.exports = {
  show: async (req, res) => {
    try {
      // This controller sending User Data to /panel.js //
      const sessionUser = req.session.get('user')

      const id = req.params.id
      if (!sessionUser) {
        return res.end()
      }
      const providerEmail = (provider) => userDb[provider]['email']

      const userDb = await User.findById(id)
      // We sent User to Panel Page as Providers firstName LastName
      const user = {
        ...userDb._doc,
        // Overwrighting user objects name virtual
        name:
          (sessionUser.provider === 'linkedin' && {
            firstName: userDb.linkedin.name.givenName,
            lastName: userDb.linkedin.name.familyName,
          }) ||
          (sessionUser.provider === 'facebook' && {
            firstName: userDb.facebook.name.givenName,
            lastName: userDb.facebook.name.familyName,
            photo: userDb.facebook.picture,
          }) ||
          (sessionUser.provider === 'local' && { ...userDb.name }),
        photo:
          (sessionUser.provider === 'facebook' && userDb.facebook.picture) ||
          (sessionUser.provider === 'linkedin' && userDb.linkedin.picture) ||
          (sessionUser.provider === 'local' && userDb.photos[0]),
        email: providerEmail(sessionUser.provider)
      }
      console.log('USER SENT FROM SERVER', user)

      return res.status(200).json(user)
    } catch (err) {
      console.error('Server Error', err)
    }
  },
}
