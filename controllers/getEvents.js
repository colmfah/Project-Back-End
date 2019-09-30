const Event = require('../models/events')
const User = require('../models/users')
const moment = require('moment')




module.exports = (req, res) => {

	Event.find()
	.populate({
		path: 'organiser',
		select: 'name'
	})
	.lean()
	.then(data => {

		// data is filtered to only show events in the future and they are sorted by nearest event

		res.send(data.filter(e => moment().isBefore(e.startDetails)).sort(	(a,b) => moment(a.startDetails) - moment(b.startDetails)	))
	})
	.catch(err => console.log(err))
}

// Product.findOne({}).populate({
//   path: 'category',
//   select: 'name'
// })
