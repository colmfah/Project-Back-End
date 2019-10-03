const Event = require('../models/events')

module.exports = (req, res) => {
let apiUrl = req.protocol + '://' + req.get('host') + '/'

let newEvent = {
  title: req.body.title,
  location: req.body.location,
  ticketNo: req.body.ticketNo,
  price: req.body.price,
  description: req.body.description,
  startDetails: req.body.startDetails,
  endDetails: req.body.endDetails,
  organiser: req.body.organiser,
  currency: req.body.currency,
	imageURL: apiUrl + req.file.filename
 }

	Event.create(newEvent)
	.then(data => {
		console.log('data', data)
		res.send(data)
	})
	.catch(err => console.log(err))

}
