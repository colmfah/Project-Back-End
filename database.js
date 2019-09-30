const mongoose = require('mongoose')

const database = mongoose.connect('mongodb://localhost:27017/tickets',  {useNewUrlParser: true}, (err) => {
	  err ? console.log(err) : console.log('Connected to MongoDB')

})




module.exports = database
