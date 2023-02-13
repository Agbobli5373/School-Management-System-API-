const Subject = require("../../model/Academics/Subject");
const Admin = require("../../model/Staff/Admin");
const Program = require("../../model/Academics/Program");
const AsyncHandler = require("express-async-handler");

//@Desc Create Subject
//@Route POST api/v1/subjects/programID
//@Access Private
exports.createSubjectCtrl = AsyncHandler(async (req, res) => {
  const { name, description, academicTerm } = req.body;
  const subjectExit = await Subject.findOne({ name });
  if (subjectExit) {
    throw new Error("Subject Already Exit");
  }
  const programExit = await Program.findById(req.params.programID);
  if (!programExit) {
    throw new Error("Program is not Found");
  }
  const createdSubject = await Subject.create({
    name,
    description,
    academicTerm,
    createdBy: req.useAuth._id,
  });

  //pushing Subjects to program
  const program = await Program.findById(req.params.programID);
  program.subjects.push(createdSubject);
  await program.save();

  res.status(201).json({
    status: "Success",
    message: "Subject created Successfull",
    data: createdSubject,
  });
});

//@Desc Get Single Subject
//@Route GET api/v1/Subjects/:id
//@Access Private
exports.getSubjectCtrl = AsyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  if(!subject){
    throw new Error("Subject Not Found")
  }
  res.status(200).json({
    status: "Success",
    message: " Get Single Subject Successfull",
    data: subject,
  });
});

//@Desc Get All Subject
//@Route GET api/v1/Subjects
//@Access Private
exports.getSubjectsCtrl = AsyncHandler(async (req, res) => {
  const subjects = await Subject.find();
  res.status(200).json({
    status: "Success",
    message: "Get all Subject Successfull",
    data: subjects,
  });
});

//@Desc Update Subject
//@Route PUT api/v1/Subjects
//@Access Private
exports.updateSubjectCtrl = AsyncHandler(async (req, res) => {
  const { name, description,academicTerm } = req.body;

  const subjectExit = await Subject.findOne({ name });
  if (subjectExit) {
    throw new Error("Subject Already Exit");
  }
  const isFound = await Subject.findById(req.params.id);

  if (!isFound) {
    throw new Error("Subject your updating do not exit");
  }

  const updatedSubject = await Subject.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      academicTerm,
      createdBy: req.useAuth._id,
    },
    {
      new: true,
    }
  );

  //pushing Subjects to admin model
  /* const admin = await Admin.findById(req.useAuth._id);
    admin.Subjects.push(createdSubject);
    await admin.save(); */

  res.status(201).json({
    status: "Success",
    message: "Subject created Successfull",
    data: updatedSubject,
  });
});

//@Desc Create Subject
//@Route POST api/v1/Subjects
//@Access Private
exports.deleteSubjectCtrl = AsyncHandler(async (req, res) => {
  const isFound = await Subject.findById(req.params.id);
  if (!isFound) {
    throw new Error("Subject your deleting do not exit");
  }
  const deletedSubject = await Subject.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "Success",
    message: "Subject created Successfull",
  });
});
