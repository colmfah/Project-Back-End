const Event = require('../models/events')

module.exports = (req, res) => {

	Event.create(req.body)
	.then(data => {
		res.send(data)
	})
	.catch(err => console.log(err))
}
