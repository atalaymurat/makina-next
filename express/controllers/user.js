const User = require('../models/user')

module.exports = {
	show: async (req, res) => {
		try {
			const sessionUser = req.session.get('user')
			const id = req.params.id
			console.log("USER", sessionUser )
			 if (!sessionUser) {
				return res.end()
			}

			const user = await User.findById(id)
			console.log("USER", user)

			return res.status(200).json( user )
		} catch (err) {
			console.error('Server Error')
		}
	},
}
