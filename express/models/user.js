const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
	{
		name: { firstName: String, lastName: String },
		email: String,
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
		toJSON: false,
	}
)

const User = mongoose.model('user', userSchema)

module.exports = User
