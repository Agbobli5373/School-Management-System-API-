const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const adminRouter = require('../routes/Staff/adminiRoute')
const academicYrRouter = require("../routes/Accademics/academicYearRoute")
const {errorHandler,notFound} = require('../middlewares/globalErrorHandler')

const app = express()

//middleware
app.use(morgan('dev'))

//body-parser middlerware
app.use(bodyParser.urlencoded ({ extended :false}));
app.use(bodyParser.json()) ;

//app.use(express.json()) // pass json data

// Admin routes
app.use('/api/v1/admins/' , adminRouter) ;

//Accademic Year route
app.use('/api/v1/academic-year/', academicYrRouter) ;

//not found middleware
app.use(notFound);

//error middleware
app.use(errorHandler);

module.exports = app 