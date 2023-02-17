const Teacher = require("../../model/Staff/Teacher");
const { hashPassword, verifyPassword } = require("../../utils/helper");
const Admin = require("../../model/Staff/Admin");
const Subject = require("../../model/Academics/Subject");
const Program = require("../../model/Academics/Program");
const ClassLevel = require("../../model/Academics/ClassLevel");
const AcademicTerm = require("../../model/Academics/AcademicTerm");
const AcademicYear = require("../../model/Academics/AcademicYear");
const AsyncHandler = require("express-async-handler");
const generateToken = require("../../utils/generateToken");

//@Desc Register Teacher
//@Route POST /api/v1/teachers/admin/register
//Access Private
exports.adminRegisterTeacher = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const isFound = await Teacher.findOne({ email });
  if (isFound) {
    throw new Error("Teacher with this emaill registed already");
  }
  //creating teacher
  const createdTeacher = await Teacher.create({
    name,
    email,
    password: await hashPassword(password),
  });

  res.status(201).json({
    status: "Sucess",
    message: "Teacher created Successful",
    data: createdTeacher,
  });
});

//@Desc Teacher Login
//@Route POST /api/v1/teacher/login
//Access Public
exports.teacherLoginCtrl = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //checking if user exit
  const user = await Teacher.findOne({ email });
  if (!user) {
    return res.json({
      message: "Invalid Login",
    });
  }
  const isMatch = await verifyPassword(password, user.password);
  console.log(isMatch);
  if (!isMatch) {
    return res.json({ message: "Invalid Credential" });
  } else {
    return res.json({
      data: generateToken(user._id),
      message: "Teacher Logged successfully",
    });
  }
});

//@Desc Admin Fetch Single Teacher
//@Route GET /api/v1/teachers/admin/:teacherID
//Access Private
exports.adminGetTeacherCtrl = AsyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.teacherID);
  res.status(200).json({
    status: "Success",
    message: "Admin Fetch Single Teacher Successfull",
    data: teacher,
  });
});

//@Desc Admin Fetch All Teachers
//@Route GET /api/v1/teachers/admin/
//Access Private Admin
exports.adminGetTeachersCtrl = AsyncHandler(async (req, res) => {
  const teachers = await Teacher.find();
  res.status(200).json({
    status: "Success",
    message: "Admin Fetch All Teachers Successfull",
    data: teachers,
  });
});

//@Desc Get Teacher profile
//@Route GET /api/v1/teachers/profile
//Access Private teacher Only
exports.getTeacherProfile = AsyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.useAuth._id).select(
    "-password -createdAt -updatedAt"
  );
  if (!teacher) {
    throw new Error("No teacher Found");
  }
  res.status(200).json({
    status: "Succes",
    message: "Teacher Profile Fetch Successfull",
    data: teacher,
  });
});

//@Desc Update Teacher profile
//@Route PUT /api/v1/teachers
//Access Private teacher Only
exports.updateTeacherCtrl = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const teacherExit = await Teacher.findOne({ email });
  if (teacherExit) {
    throw new Error("The email exit already");
  }
  if (password) {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.useAuth,
      {
        name,
        email,
        password: await hashPassword(password),
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "Success",
      message: "Teacher Update Successsfull",
      data: updatedTeacher,
    });
  } else {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.useAuth,
      {
        name,
        email,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "Success",
      message: "Teacher Update Successsfull",
      data: updatedTeacher,
    });
  }
});

//@Desc admin assign role to a teacher
//@Route PUT /api/v1/teachers/admin/:teacherID/update
//Access Private Admin
exports.adminUpdateTeacherCtrl = AsyncHandler(async (req, res) => {
  const {
    subject,
    applicationStatus,
    program,
    classLevel,
    academicYear,
    academicTerm,
  } = req.body;
  const teacherFound = await Teacher.findById(req.params.teacherID);
  if (!teacherFound) {
    throw new Error("Teacher is not Found");
  }
  const subjectFound = await Subject.findOne({ subject });
  if (!subjectFound) {
    throw new Error("Subject is not found");
  }
  const programFound = await Program.findOne({ program });
  if (!programFound) {
    throw new Error("Program is not found");
  }
  const academicTermFound = await AcademicTerm.findOne({ academicTerm });
  if (!academicTermFound) {
    throw new Error(" Academic Term is not found");
  }
  const academicYearFound = await AcademicTerm.findOne({ academicYear });
  if (!academicYearFound) {
    throw new Error("Accademic year is not found");
  }
  const classLevelFound = await AcademicTerm.findOne({ classLevel });
  if (!classLevelFound) {
    throw new Error("Class level is not found");
  }
  const updatedTeacher = await Teacher.findByIdAndUpdate(
    req.params._id,
    {
      subject,
      applicationStatus,
      program,
      classLevel,
      academicYear,
      academicTerm,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "Success",
    message: "Updated Teacher Successfull",
    data: updatedTeacher,
  });
});
