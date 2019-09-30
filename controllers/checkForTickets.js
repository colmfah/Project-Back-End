const Event = require('../models/events')
const Ticket = require('../models/ticket')


module.exports = (req, res) => {

	Event.findById(req.body.event)
	.lean()
  .then(data => {

		if(!(data.ticketsSold.length < data.ticketNo)){
			let responseObject = {
				insufficientTickets: true,
				message: 'Sorry, this event is now sold out'
			}
			res.send(responseObject)
		}

		else if(!(data.ticketsSold.length + req.body.numTicketsSought < data.ticketNo)){
			let ticketsAvailable = data.ticketNo - data.ticketsSold.length
			let responseObject = {
				insufficientTickets: true,
				message: `Sorry, there are only ${ticketsAvailable} tickets remaining for this event. Please change your order quantity if you would like to purchase them`
			}
			res.send(responseObject)
		}

		else {
			let responseObject = {
				insufficientTickets: false,
				message: `${req.body.numTicketsSought} tickets are available`
			}
			res.send(responseObject)
		}
			}
		)
		.catch(err => console.log(err))
	}
