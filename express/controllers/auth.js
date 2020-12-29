const User = require('../models/user')

module.exports = {
  signUp: async (req, res) => {
    console.log('controller signIn')
    try {
      console.log('CTRL SIGNUP USER DATA POSTED:', req.body)
      // We will check user from db here
      const email = req.body.email
			const firstName = req.body.firstName
			const lastName = req.body.lastName

			const newUser = new User({
			name: {firstName, lastName },
				email
			})

			await newUser.save()



      req.session.set('user', {firstName: newUser.name.firstName, _id: newUser._id } )
      await req.session.save()
      return res.json({success: true, ...newUser._doc  })
    } catch (err) {
      console.error('Server Error')
    }
  },

  user: async (req, res) => {
    try {
      const user = req.session.get('user')
      console.log('CTRL USER REQUESTED SESSION USER:', user)
      if (user === undefined) {
        res.end()
        return
      }
      // Find user from db
      // Respond with user object

      res
        .status(200)
        .json({ success: true, id: user.id, firstName: user.firstName, email: user.email})
    } catch (err) {
      console.error('Server Error')
    }
  },

  logOut: (req, res) => {
    console.log('Session Destroyed', req.session.get("user"))
    const user = req.session.get("user")
    if ( user === undefined){
      return res.json({ success: false, message: "No User Session"}).end()
    }
    req.session.destroy()
    res.status(200).json({ success: true, message:"Session Destroyed"})
  },
}
