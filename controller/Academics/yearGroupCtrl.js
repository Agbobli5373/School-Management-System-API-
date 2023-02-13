const YearGroup = require("../../model/Academics/YearGroup");
const Admin = require("../../model/Staff/Admin");
const AcademicYear = require("../../model/Academics/AcademicYear");
const AsyncHandler = require("express-async-handler");


//@Desc Create Year Group
//@Route POST api/v1/year-groups/
//@Access Private
exports.createYearGroupCtrl = AsyncHandler(async (req, res) => {
  const { name, academicYear } = req.body;
  const YearGroupExit = await YearGroup.findOne({name}) ;
  if(YearGroupExit){
    throw new Error("Year group Exit Already");
  } 
  const academicYearFound = await AcademicYear.findOne({academicYear}) ;
  if(academicYearFound){
    throw new Error("Academic Year do not found");
  } 
  const createdYearGroup = await YearGroup.create({
    name,
    academicYear,
    createdBy: req.useAuth._id
  })
  //push admin year group to admin model
  const admin = await Admin.findById(req.useAuth._id);
  admin.yearGroups.push(createdYearGroup);
  await admin.save();

  res.status(201).json({
    status: "Success",
    message: "Year Group created Successful",
    data: createdYearGroup,
  });
});

//@Desc Get single Year Group
//@Route GET api/v1/year-groups/:id
//@Access Private
exports.getYearGroupCtrl = AsyncHandler(async (req, res) => {
    const yearGroup = await YearGroup.findById(req.params.id)
    res.status(201).json({
      status: "Success",
      message: "Year Group fetch Successful",
      data: yearGroup,
    });
  });
  
//@Desc Get all Year Group
//@Route GET api/v1/year-groups/
//@Access Private
exports.getYearGroupsCtrl = AsyncHandler(async (req, res) => {
    const yearGroups = await YearGroup.find() ;
    res.status(201).json({
      status: "Success",
      message: "Year Groups Fetch Successful",
      data: yearGroups,
    });
  });

//@Desc Update Year Group
//@Route PUT api/v1/year-groups/:id
//@Access Private
exports.updateYearGroupCtrl = AsyncHandler(async (req, res) => {
    const { name, academicYear } = req.body;
    const YearGroupExit = await YearGroup.findOne({name}) ;
    if(YearGroupExit){
      throw new Error("Year group Exit Already");
    } 
    const updatedYearGroup = await YearGroup.findByIdAndUpdate(req.params.id ,{
      name,
      academicYear,
      createdBy: req.useAuth._id
    },{
        new : true
    })
    res.status(201).json({
      status: "Success",
      message: "Year Group updated Successful",
      data: updatedYearGroup,
    });
  });
  
//@Desc Delete Year Group
//@Route DELETE api/v1/year-group/
//@Access Private
exports.deleteYearGroupCtrl = AsyncHandler(async (req, res) => {
    const YearGroupFound = await YearGroup.findById(req.params.id) ;
    if(!YearGroupFound){
      throw new Error("Year group deleting doesn't exit");
    } 
    const deletedYearGroup = await YearGroup.findByIdAndDelete(req.params.id)
    res.status(201).json({
      status: "Success",
      message: "Year Group Deleted Successful"
    });
  });
  