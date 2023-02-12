const Subject = require("../../model/Academics/Subject");
const Admin = require("../../model/Staff/Admin");
const AsyncHandler = require("express-async-handler");

//@Desc Create Subject
//@Route POST api/v1/Subjects
//@Access Private
exports.createSubjectCtrl = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const subjectExit = await Subject.findOne({ name });
  if (subjectExit) {
    throw new Error("Subject Already Exit");
  }
  const createdSubject = await Subject.create({
    name,
    description,
    createdBy: req.useAuth._id,
  });

  //pushing Subjects to admin model
  const admin = await Admin.findById(req.useAuth._id);
  admin.subjects.push(createdSubject);
  await admin.save();

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
  const { name, description } = req.body;

  const SubjectExit = await Subject.findOne({ name });
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
