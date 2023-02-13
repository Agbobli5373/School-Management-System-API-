const YearGroup = require("../../model/Academics/YearGroup");
const Admin = require("../../model/Staff/Admin");
const Program = require("../../model/Academics/Program");
const AsyncHandler = require("express-async-handler");

//@Desc Create Year Group
//@Route POST api/v1/year-group/
//@Access Private
exports.createYearGroupCtrl = AsyncHandler(async (req, res) => {
  const { name, academicYear } = req.body;
  const YearGroupExit = await YearGroup.findOne({name}) ;
  if(YearGroupExit){
    throw new Error("Year group Exit Already");
  } 
  const createdYearGroup = await YearGroup.create({
    name,
    academicYear,
    createdBy: req.useAuth._id
  })
  res.status(201).json({
    status: "Success",
    message: "Year Group created Successful",
    data: createdYearGroup,
  });
});

//@Desc Get single Year Group
//@Route POST api/v1/year-group/:id
//@Access Private
exports.createYearGroupCtrl = AsyncHandler(async (req, res) => {
    const yearGroup = await YearGroup.findById(req.params.id)
    res.status(201).json({
      status: "Success",
      message: "Year Group created Successful",
      data: yearGroup,
    });
  });
  

