const mongoose = require('mongoose')

const User = mongoose.model('user', {
	name: {
		type: String,
		required: [true, 'name is required']
	},
	password: {
		type: String,
		required: [true, 'password is required']
	},
	email: {
		type: String,
		required: [true, 'email is required']
	},
	location: {
		type: String,
		required: [true, 'location is required']}
})


module.exports = User
