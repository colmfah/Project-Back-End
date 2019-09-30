const Event = require('../models/events')
const Ticket = require('../models/ticket')
const User = require('../models/users')
const nodemailer = require('nodemailer')
const moment = require('moment')

// [...Array(this.props.rating)].map

module.exports = (req, res) => {

	Event.findById(req.body.event)
	.lean()
  .then(data => {

			const genNum = () => {
					return Math.floor(Math.random() * (1000000000) + 1)
			}


			let ticketNumbers = []

			{[...Array(req.body.numTicketsSought)].map(	(e,i) => {
				let randomNumber = genNum()

				while(ticketNumbers.includes(randomNumber) || data.ticketsSold.includes(randomNumber)){
					randomNumber = genNum()
				}
				ticketNumbers.push(randomNumber)
			}		)}

			let ticketsSold = data.ticketsSold
			ticketNumbers.forEach(e => {ticketsSold.push(e)})

			Event.findByIdAndUpdate({_id:req.body.event}, {
				ticketsSold: ticketsSold
			})
			.then()
			.catch(err => console.log(err))

			ticketNumbers.forEach(	(e,i) => {

				let newTicket = {
					randomNumber: e,
					event: req.body.event,
					purchaser: req.body.purchaser
				}

				Ticket.create(newTicket)
				.then()
				.catch(err => console.log(err))

			}	)

			User.findById(req.body.purchaser)
			.then(purchaser => {

				ticketNumbers.forEach(	(e,i) => {

					var transporter = nodemailer.createTransport({
					  service: 'gmail',
					  auth: {
					    user: 'colmfaheysep2019@gmail.com',
					    pass: 'tortuga2019'
					  }
					});

					var mailOptions = {
					  from: 'colmfaheysep2019@gmail.com',
					  to: purchaser.email,
					  subject: `Your Ticket for ${data.title}`,
						html: `<h2>You are going to ${data.title}</h2>
						<p>${data.location}</p>
						<p>Starts at ${moment(data.startDetails).format('DD MMMM YYYY HH:mm')}</p>
						<p>Ends at ${moment(data.endDetails).format('DD MMMM YYYY HH:mm')}</p>
						<h1>Your QR code to enter the event is <a href="http://localhost:3000/qr/${e}">here</a></h1>
						<p>Ticket ${i+1} of ${ticketNumbers.length} purchased. Each ticket will arrive in a seperate email.</p>`

					}

					transporter.sendMail(mailOptions, function(error, info){
					  if (error) {
					    console.log(error);
					  } else {
					    console.log('Email sent: ' + info.response);
					  }
					});

				})
				}		)
					.catch(err => console.log(err))

		res.send('Tickets Created')
	})
	.catch(err => console.log(err))
}

	// find event by id -- req.body.event
	//
	// compare number of tickets permitted to array length
	//
	// if not less than res.send 'sold out'
	//
	// if less than, create ticket
	// 							generate randomNumber
									// check that randomNumber isn't already contained in array
	// 							push random number to event (patch?)
	// 							use as random number in ticket
