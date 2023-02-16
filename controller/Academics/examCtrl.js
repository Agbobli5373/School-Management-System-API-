const Exam = require("../../model/Academics/Exam");
const Teacher = require("../../model/Staff/Teacher");
const Subject = require("../../model/Academics/Subject");
const Program = require("../../model/Academics/Program");
const AcademicTerm = require("../../model/Academics/AcademicTerm");
const AcademicYear = require("../../model/Academics/AcademicYear");
const ClassLevel = require("../../model/Academics/ClassLevel");
const AsyncHandler = require("express-async-handler");

//@Descs Creating of Exam
//@Route POST /api/v1/exams/teacher
//@Access Private to Teacher
exports.createExamCtrl = AsyncHandler(async (req, res) => {
  const {
    name,
    description,
    subject,
    program,
    academicTerm,
    Examtime,
    classLevel,
    academicYear,
  } = req.body;

  const examExit = await Exam.findOne({ name });
  if (examExit) {
    throw new Error("Exam Already exit");
  }
  const subjectFound = await Subject.findOne({ subject });
  if (!subjectFound) {
    throw new Error("Subject not found");
  }
  const programFound = await Program.findOne({ program });
  if (!programFound) {
    throw new Error("Program not found");
  }
  const academicTermFound = await AcademicTerm.findOne({ academicTerm });
  if (!academicTermFound) {
    throw new Error("Academic Term not found");
  }
  const classLevelFound = await ClassLevel.findOne({ classLevel });
  if (!classLevelFound) {
    throw new Error("Class Level not found");
  }
  const academicYearFound = await AcademicYear.findOne({ academicYear });
  if (!academicYearFound) {
    throw new Error("Academic Year not found");
  }
  const createdExam = await Exam.create({
    name,
    description,
    subject: subjectFound?._id,
    program: programFound?._id,
    academicTerm: academicTermFound?._id,
    Examtime,
    classLevel: classLevelFound?._id,
    academicYear: academicYearFound?._id,
    createdBy: req.useAuth._id,
  });
  //push examID to teacher model
  const teacher = Teacher.findById(req.useAuth._id);
  await teacher.examsCreated.push(createdExam._id);
  teacher.save();

  res.status(201).json({
    status: "Success",
    message: "Exam Created Successfull",
    data: createdExam,
  });
});

//@Descs Fetching single exam
//@Route GET /api/v1/exams/:examID
//@Access Private
exports.getExamCtrl = AsyncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.examId);
  if (!exam) {
    throw new Error("Exam not Found");
  }
  res.status(200).json({
    status: "Success",
    message: "Single Exam fetch Successfull",
    data: exam,
  });
});

//@Descs Fetching All  exam
//@Route GET /api/v1/exams
//@Access Private
exports.getExamsCtrl = AsyncHandler(async (req, res) => {
  const exams = await Exam.find();
  res.status(200).json({
    status: "Success",
    message: "All Exam fetch Successfull",
    data: exams,
  });
});

//@Descs Delete exam
//@Route DELETE /api/v1/exams
//@Access Private
exports.deleteExamCtrl = AsyncHandler(async (req, res) => {
  const deleteExam = await Exam.findByIdAndDelete(req.params.examID);
  if (deleteExam) {
    res.status(200).json({
      status: "Success",
      message: "Exam deleted successfull",
    });
  } else {
    throw new Error("Exam not Found");
  }
});

//@Descs Updating of Exam
//@Route PUT /api/v1/exams/:examID/update
//@Access Private to Teacher
exports.updateExamCtrl = AsyncHandler(async (req, res) => {
  const {
    name,
    description,
    subject,
    program,
    academicTerm,
    Examtime,
    classLevel,
    academicYear,
  } = req.body;

  const examExit = await Exam.findOne({ name });
  if (examExit) {
    throw new Error("Exam Already exit");
  }
  const subjectFound = await Subject.findOne({ subject });
  if (!subjectFound) {
    throw new Error("Subject not found");
  }
  const programFound = await Program.findOne({ program });
  if (!programFound) {
    throw new Error("Program not found");
  }
  const academicTermFound = await AcademicTerm.findOne({ academicTerm });
  if (!academicTermFound) {
    throw new Error("Academic Term not found");
  }
  const classLevelFound = await ClassLevel.findOne({ classLevel });
  if (!classLevelFound) {
    throw new Error("Class Level not found");
  }
  const academicYearFound = await AcademicYear.findOne({ academicYear });
  if (!academicYearFound) {
    throw new Error("Academic Year not found");
  }
  const updatedExam = await Exam.findByIdAndUpdate(
    req.params.examID,
    {
      name,
      description,
      subject: subjectFound?._id,
      program: programFound?._id,
      academicTerm: academicTermFound?._id,
      Examtime,
      classLevel: classLevelFound?._id,
      academicYear: academicYearFound?._id,
      createdBy: req.useAuth._id,
    },
    {
      new: true,
    }
  );
  //push examID to teacher model
  /* const teacher = Teacher.findById(req.useAuth._id);
  await teacher.examsCreated.push(createdExam._id);
  teacher.save(); */

  res.status(201).json({
    status: "Success",
    message: "Exam Created Successfull",
    data: updatedExam,
  });
});
