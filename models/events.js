const mongoose = require('mongoose')

const Event = mongoose.model('event', {
	title: {
		type: String,
		required: [true, 'title is required']
	},
	location: {
		type: String,
		required: [true, 'location is required']
	},
	ticketNo: {
		type: Number,
		required: [true, 'number of tickets is required']
	},
	price: {
		type: Number,
		required: [true, 'price is required']
	},
	description: {
		type: String,
		required: [true, 'description is required']
	},
	startDetails: {
		type: Object,
		required: [true, 'start date and time are required']
	},
	endDetails: {
		type: Object,
		required: [true, 'end date and time are required']
	},
	organiser: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: [true, 'organiser id is required']
	},
	currency: {
		type: String,
		required: [true, 'currency is required']
	},
	ticketsSold: [
		{type: Number
		}
	],
	ticketsCheckedIn: [
		{type: Number
		}
	],
	
	imageURL: {
		type: String,
		required: [true, 'imageUrl is required']
	}

})

module.exports = Event
