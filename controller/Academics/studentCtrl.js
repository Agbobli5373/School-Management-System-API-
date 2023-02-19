const AsyncHandler = require("express-async-handler");
const Student = require("../../model/Academics/Student");
const Admin = require("../../model/Staff/Admin");
const { hashPassword, verifyPassword } = require("../../utils/helper");
const verifyToken = require("../../utils/verifyToken");

//@Desc Register Student
//@Route POST /api/v1/students/admin/register
//@Access Private to Admin
exports.registerStudentCtrl = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const studentExit = await Student.findOne({ email });
  if (studentExit) {
    throw new Error("Student exit");
  }
  const createdStudent = await Student.create({
    name,
    email,
    password: await hashPassword(password),
  });
  const admin = await Admin.findById(req.useAuth._id);
  await admin.students.push(createdStudent);
  admin.save();

  res.status(201).json({
    status: "Success",
    message: "Student Created Successfull",
    data: createdStudent,
  });
});

//@Desc Student login
//@Route POST api/v1/students/login
//@Access Public
exports.studentLoginCtl = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const student = await Student.findOne({ email });
  if (!student) {
    return res.status(500).json({
      message: "Student not found",
    });
  }

  const isMatch = await verifyPassword(password, student.password);
  if (isMatch) {
    res.status(200).json({
      status: "Success",
      data: verifyToken(student._id),
    });
  } else {
    res.status(500).json({
      message: "Invalid Login details",
    });
  }
});

//@Desc Student profile
//@Route GET api/v1/students/profile
//@Access Private to student
exports.studentProfileCtl = AsyncHandler(async (req, res) => {
  const student = await Student.findById(req.useAuth._id);
  if (student) {
    res.status(200).json({
      status: "Success",
      data: student,
    });
  } else {
    throw new Error(" Student profile not found");
  }
});

//@Desc Get single Student
//@Route GET api/v1/students/:studentID
//@Access Private
exports.getStudentCtl = AsyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.studentID);
  if (student) {
    res.status(200).json({
      status: "Success",
      data: student,
    });
  } else {
    throw new Error(" Student profile not found");
  }
});
//@Desc Get All student Student
//@Route GET api/v1/students
//@Access Private
exports.getStudentsCtl = AsyncHandler(async (req, res) => {
  const students = await Student.find();
  res.status(200).json({
    status: "Success",
    data: students,
  });
});
