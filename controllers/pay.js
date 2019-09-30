const stripe = require("stripe")(process.env.STRIPE_SECRET)


module.exports = (req, res) => {

	stripe.charges.create({
  amount: Math.round(Number(req.body.amount *100)),
  currency: req.body.currency,
  description: req.body.description,
  source: req.body.source
})
.then(data => {
	res.send('Payment Successful')}
)
.catch(err => {
	res.send('Payment Not Successful')
})

}
