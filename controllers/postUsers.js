const User = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



module.exports = (req, res) => {
	User.findOne({email: req.body.email}).then(data => {
		if (data) {
			res.send('You already registered')
	} else{

		let encrypted = bcrypt.hashSync(req.body.password, 10)
		req.body.password = encrypted
		User.create(req.body)
		.then(data => {
					let object = data.toObject()
					let token = jwt.sign(object, process.env.SECRET)
					res.send(token)
		})
		.catch(err => console.log(err))

	}

})
}
