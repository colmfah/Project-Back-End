const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const database = require('./database')
const multer = require('multer')
const upload = multer({ dest: 'photos/' })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({credentials: true}))
app.use(express.static(path.join(__dirname, 'photos')))

app.get('/events', require('./controllers/getEvents'))
app.get('/events/:id', require('./controllers/getEventById'))
app.get('/', require('./controllers/root'))

app.post('/auth', require('./controllers/authorise'))
app.post('/checkForTickets', require('./controllers/checkForTickets'))
app.post('/checkIn', require('./controllers/checkIn'))
app.post('/events', require('./controllers/postEvent'))
app.post('/image', upload.single('file'), require('./controllers/postImage'))
app.post('/login', require('./controllers/login'))
app.post('/pay', require('./controllers/pay'))
app.post('/profile', require('./controllers/profile'))
app.post('/ticket', require('./controllers/createTicket'))
app.post('/users', require('./controllers/postUsers'))








app.listen(process.env.PORT, () => {
  console.log(`Ready on port ${process.env.PORT}`)
})
