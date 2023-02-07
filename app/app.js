const express = require('express')
const morgan = require('morgan')
const adminRouter = require('../routes/Staff/adminiRoute')

const app = express()

//middleware
app.use(morgan('dev'))

//routes
app.use( '/api/v1/admins/' , adminRouter) 


module.exports = app 