const express = require('express')
const adminRouter = express.Router()

//register 
adminRouter.post('/register',(req,res)=>{
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
adminRouter.post('/login',(req,res)=>{
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
adminRouter.get('',(req,res)=>{
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
adminRouter.get('/:adminID', (req,res)=>{
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
adminRouter.put('/:adminID', (req,res)=>{
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
adminRouter.delete('/:adminID', (req,res)=>{
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
adminRouter.put('/suspend/teacher/:Id', (req,res)=>{
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
adminRouter.put('/unsuspend/teacher/:Id', (req,res)=>{
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
adminRouter.put('/withdraw/teacher/:Id', (req,res)=>{
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
adminRouter.put('/unwithdraw/teacher/:Id', (req,res)=>{
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
adminRouter.put('/publish/exam/:Id', (req,res)=>{
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
adminRouter.put('/unpublish/exam/:Id', (req,res)=>{
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

module.exports = adminRouter 