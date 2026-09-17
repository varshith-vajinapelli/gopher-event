const express = require('express')
const app = express()
require('dotenv').config()
const cors = require("cors")

const authRoutes = require('./routes/auth.routes')
const eventRoutes = require('./routes/event.routes')

const corsOptions = {
	origin: [
		"https://gopherevent.com",
		"http://localhost:5173"
	],
	credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/auth', authRoutes)

app.use('/events', eventRoutes)


module.exports = app
