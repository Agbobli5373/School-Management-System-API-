const AcademicTerm = require('../../model/Academics/AcademicTerm');
const AsynHandler = require("express-async-handler") ;

//@Desc Create Academic term
//@Route POST api/v1/academic-terms
//@Access Private

exports.createAcademicTermCtrl = AsynHandler( async (req,res)=>{
     res.status(200).json({
        status : 'success'
     })
})

//@Desc Get Single  Academic term
//@Route GET api/v1/academic-terms
//@Access Private

exports.getAcademicTermCtrl = AsynHandler( async (req,res)=>{
    res.status(200).json({
        status : 'success'
     })
})

//@Desc Get all Academic term
//@Route POST api/v1/academic-terms
//@Access Private
exports.getAcademicTermsCtrl = AsynHandler( async (req,res)=>{
    res.status(200).json({
        status : 'success'
     })
})

//@Desc Update Academic term
//@Route PUT api/v1/academic-terms
//@Access Private
exports.updateAcademicTermCtrl = AsynHandler( async (req,res)=>{
    const {name , description,duration} = req.body;
    const academicTermExit = await AcademicTerm.findOne({name});
    if(academicTermExit){
        throw new Error("Academic Year Exit");
    }

    const createdAcademicTerm = await AcademicTerm.create({
        name,
        description,
        duration,
        createdBy : req.useAuth._id
    })
    res.status(201).json({
        status : 'success',
        message : "Academic Term Created Successfully",
        data : createdAcademicTerm
     })
})

//@Desc Delete Academic term
//@Route POST api/v1/academic-terms
//@Access Private
exports.deleteAcademicTermCtrl = AsynHandler( async (req,res)=>{
    res.status(200).json({
        status : 'success'
     })
})