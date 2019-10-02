const Event = require('../models/events')
const User = require('../models/users')
const moment = require('moment')


module.exports = (req, res) => {


	Event.find({_id: req.body.eventid})
	.lean()
	.then(eventdata => {
		req.body.qrcode = Number(req.body.qrcode)

		if(eventdata[0].ticketsCheckedIn.includes(req.body.qrcode)){
			res.send('This ticket has already been checked in. Do not allow entry')
		} else if(!eventdata[0].ticketsSold.includes(req.body.qrcode)){
			res.send('Fraudelent ticket. Do not allow entry')
		} else if(eventdata[0].ticketsSold.includes(req.body.qrcode)){


			let ticketsCheckedIn = eventdata[0].ticketsCheckedIn
			ticketsCheckedIn.push(req.body.qrcode)

			Event.findByIdAndUpdate({_id:req.body.eventid}, {
				ticketsCheckedIn: ticketsCheckedIn
			})
			.then(data => {
				res.send('Ticket Found. Customer has now been checked in')
			})
			.catch(err => console.log(err))



		}

	})
	.catch(err => console.log(err))
}
