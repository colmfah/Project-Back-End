const jwt = require('jsonwebtoken')


module.exports = (req, res) => {
	if(req.body.token){
		let data = jwt.verify(req.body.token, process.env.SECRET)
		delete data.password
		res.send(data)
	} else {
		console.log('no token')
	}

}
