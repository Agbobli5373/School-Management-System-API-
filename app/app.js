const { json } = require('express')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const adminRouter = require('../routes/Staff/adminiRoute')

const app = express()

//middleware
app.use(morgan('dev'))

//body-parser middlerware
app.use(bodyParser.urlencoded ({ extended :false}));
app.use(bodyParser.json()) ;

//app.use(express.json()) // pass json data



// Admin routes
app.use('/api/v1/admins/' , adminRouter) 


module.exports = app 