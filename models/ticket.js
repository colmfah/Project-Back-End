const mongoose = require('mongoose')

const Ticket = mongoose.model('ticket', {
	randomNumber: {
		type: Number,
		required: [true, 'randomNumber is required']
	},
	event: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'event',
		required: [true, 'associated event is required']
	},
	purchaser: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: [true, 'purchaser id is required']
	}

})


module.exports = Ticket
