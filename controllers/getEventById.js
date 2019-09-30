const Event = require('../models/events')
const User = require('../models/users')




module.exports = (req, res) => {
	Event.findById(req.params.id)
	.populate({
		path: 'organiser',
		select: 'name'
	})
	.lean()
	.then(event => {
		event.ticketsRemaining = event.ticketNo - event.ticketsSold.length
		event.numTicketsSold = event.ticketsSold.length
		delete event.ticketsSold
		delete event.ticketNo
		res.send(event)
	}
)
	.catch(err => res.send(err))
}
