const express = require('express')
const morgan = require('morgan')

const app = express()

//middleware
app.use(morgan('dev'))

//routes

//register 
app.post('/api/v1/admins/register',(req,res)=>{
    try{
      res.status(200).json({
        status : "Success",
        data : 'Admin has been registered'
      })
    }
    catch(error){
      res.status(500).json({
         status : "Failed",
         error : Error.message

      })
    }}
)
//sign in
app.post('/api/v1/admins/login',(req,res)=>{
    try {
        res.status(200).json(
            {
                status : 'Success',
                data : 'Admin has been Login '
            }
            
        )
    }
    catch(error){
        res.status(500).json ({
            error:error.message
        })
    }
})

//get all admins
app.get('/api/v1/admins',(req,res)=>{
    try {
        res.status(200).json(
            {
                status : 'Success',
                data : 'All Admins '
            }
            
        )
    }
    catch(error){
        res.status(500).json ({
            error:error.message
        })
    }
})

//get single admin
app.get('/api/v1/admins/:adminID', (req,res)=>{
     try{
        res.status(201).json({
            status : 'success',
            data : 'Single Admins'
        })
     }
     catch(error){
        res.status(500).json({
            status : 'failed',
            error : error.message
        })
     }
})

//update admin 
app.put('/api/v1/admins/:adminID', (req,res)=>{
    try{
       res.status(201).json({
           status : 'success',
           data : 'Update Admins'
       })
    }
    catch(error){
       res.status(500).json({
           status : 'failed',
           error : error.message
       })
    }
})

//delete admin 
app.delete('/api/v1/admins/:adminID', (req,res)=>{
    try{
       res.status(201).json({
           status : 'success',
           data : 'Delete Admins'
       })
    }
    catch(error){
       res.status(500).json({
           status : 'failed',
           error : error.message
       })
    }
})
//admin suspending teacher
app.put('/api/v1/admins/suspend/teacher/:Id', (req,res)=>{
    try{
       res.status(201).json({
           status : 'success',
           data : 'Admins suspend Teacher'
       })
    }
    catch(error){
       res.status(500).json({
           status : 'failed',
           error : error.message
       })
    }
})
//admin unsuspending teacher
app.put('/api/v1/admins/unsuspend/teacher/:Id', (req,res)=>{
    try{
       res.status(201).json({
           status : 'success',
           data : 'Admins Unsuspend Teacher'
       })
    }
    catch(error){
       res.status(500).json({
           status : 'failed',
           error : error.message
       })
    }
})
//admin witdrawing teacher
app.put('/api/v1/admins/withdraw/teacher/:Id', (req,res)=>{
    try{
       res.status(201).json({
           status : 'success',
           data : 'Admins Witdraw Teacher'
       })
    }
    catch(error){
       res.status(500).json({
           status : 'failed',
           error : error.message
       })
    }
})
//admin unwitdrawing teacher
app.put('/api/v1/admins/unwithdraw/teacher/:Id', (req,res)=>{
    try{
       res.status(201).json({
           status : 'success',
           data : 'Admins unwitdraw Teacher'
       })
    }
    catch(error){
       res.status(500).json({
           status : 'failed',
           error : error.message
       })
    }
})

//admin publish result
app.put('/api/v1/admins/publish/exam/:Id', (req,res)=>{
    try{
       res.status(201).json({
           status : 'success',
           data : 'Admins publish exam'
       })
    }
    catch(error){
       res.status(500).json({
           status : 'failed',
           error : error.message
       })
    }
})
//admin unpublish result
app.put('/api/v1/admins/unpublish/exam/:Id', (req,res)=>{
    try{
       res.status(201).json({
           status : 'success',
           data : 'Admins uunpublish exam'
       })
    }
    catch(error){
       res.status(500).json({
           status : 'failed',
           error : error.message
       })
    }
})

module.exports = app 