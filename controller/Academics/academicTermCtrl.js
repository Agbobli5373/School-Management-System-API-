const AcademicTerm = require("../../model/Academics/AcademicTerm");
const Admin = require("../../model/Staff/Admin");
const AsynHandler = require("express-async-handler");

//@Desc Create Academic term
//@Route POST api/v1/academic-terms
//@Access Private

exports.createAcademicTermCtrl = AsynHandler(async (req, res) => {
  const { name, description, duration } = req.body;
  const academicTermExit = await AcademicTerm.findOne({ name });
  if (academicTermExit) {
    throw new Error("Academic Year Exit");
  }

  const createdAcademicTerm = await AcademicTerm.create({
    name,
    description,
    duration,
    createdBy: req.useAuth._id,
  });

  //pushing Accademic Term to Admin
  const admin = await Admin.findById(req.useAuth._id);
  admin.academicTerms.push(createdAcademicTerm);
  await admin.save();

  res.status(201).json({
    status: "success",
    message: "Academic Term Created Successfully",
    data: createdAcademicTerm,
  });
});

//@Desc Get Single  Academic term
//@Route GET api/v1/academic-terms
//@Access Private
exports.getAcademicTermCtrl = AsynHandler(async (req, res) => {
  const academicTerm = await AcademicTerm.findById(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Single Academic Term Fetch  Successfully",
    data: academicTerm,
  });
});

//@Desc Get all Academic term
//@Route POST api/v1/academic-terms
//@Access Private
exports.getAcademicTermsCtrl = AsynHandler(async (req, res) => {
  const academicTerms = await AcademicTerm.find();
  res.status(200).json({
    status: "success",
    message: "Get Academic Terms Successfully",
    data: academicTerms,
  });
});

//@Desc Update Academic term
//@Route PUT api/v1/academic-terms
//@Access Private
exports.updateAcademicTermCtrl = AsynHandler(async (req, res) => {
  const { name, description, duration } = req.body;
  const academicTermExit = await AcademicTerm.findOne({ name });
  if (academicTermExit) {
    throw new Error("Academic Exit Already");
  }

  const isFound = await AcademicTerm.findById(req.params.id);
  if (!isFound) {
    throw new Error("Academic Term your updating do not Exit");
  }
  const updatedAcademicTerm = await AcademicTerm.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      duration,
      createdBy: req.useAuth._id,
    },
    {
      new: true,
    }
  );
  res.status(201).json({
    status: "Success",
    message: "Academic Term Updated Successfull",
    data: updatedAcademicTerm,
  });
});

//@Desc Delete Academic term
//@Route POST api/v1/academic-terms
//@Access Private
exports.deleteAcademicTermCtrl = AsynHandler(async (req, res) => {
  const isFound = await AcademicTerm.findById(req.params.id);
  if (!isFound) {
    throw new Error("Academic Term your updating do not Exit");
  }
  const deletedAcademicTerm = await AcademicTerm.findByIdAndDelete(
    req.params.id
  );
  res.status(200).json({
    status: "success",
    message: `${deletedAcademicTerm.name} Academic Term Updated Successfull`,
  });
});
