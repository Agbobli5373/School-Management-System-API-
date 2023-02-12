const Program = require("../../model/Academics/Program");
const Admin = require("../../model/Staff/Admin");
const AsyncHandler = require("express-async-handler");

//@Desc Create Program
//@Route POST api/v1/programs
//@Access Private
exports.createProgramCtrl = AsyncHandler( async (req,res) => {
   const {name,description} = req.body ;
   const programExit = await Program.findOne({name});
   if(programExit){
      throw new Error("Program Already Exit");
   }
   const createdProgram = await Program.create({
    name,
    description,
    createdBy : req.useAuth._id
   }) ;

   //pushing programs to admin model
   const admin = await Admin.findById(req.useAuth._id);
   admin.programs.push(createdProgram);
   await admin.save();

   res.status(201).json({
    status : "Success",
    message: "Program created Successfull",
    data : createdProgram
   })
   

})