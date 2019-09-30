const User = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


module.exports = (req, res) => {

	User.findOne({email: req.body.email}).then(data => {
				if (!data) {
					res.send('You need to register')
			}

			else{
				let match = bcrypt.compareSync(req.body.password, data.password)
				if (match){
									let object = data.toObject()
									let token = jwt.sign(object, process.env.SECRET)
									res.send({token: token})
				} else {
					res.send('Wrong Password')
				}
			}
}
).catch(err => console.log(err))
	}
