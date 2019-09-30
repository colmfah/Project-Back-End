const jwt = require('jsonwebtoken')
const Ticket = require('../models/ticket')
const Event = require('../models/events')

module.exports = (req, res) => {

	if(req.body.token){
		let user = jwt.verify(req.body.token, process.env.SECRET)
		delete user.password
		Ticket.find({
			purchaser: user._id
		})
		.select('-purchaser -_id')
		.populate({
			path: 'event',
			select: 'title location startDetails endDetails'
		})
		.lean()
		.then(tickets => {

			user.ticketsBought = tickets

			Event.find({
				organiser: user._id
			})
			.select('title location ticketNo startDetails endDetails ticketsSold')
			.lean()
			.then(usersEvents => {
				usersEvents = usersEvents.map(	e => {
					e.checkIn = false
					e.message = ''
					return e
				}		)
				// usersEvents.numTicketsSold = usersEvents.ticketNo - usersEvents.ticketsSold.length
				user.usersEvents = usersEvents

			res.send(user)
		})
		.catch(err => {
			console.log(err)
		})

	})} else {
		console.log('no token')
	}



}
