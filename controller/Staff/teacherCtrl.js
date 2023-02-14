const Teacher = require("../../model/Staff/Teacher");
const { hashPassword, verifyPassword } = require("../../utils/helper");
const Admin = require("../../model/Staff/Admin");
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
  //verifying pasword
  const isMatch = verifyPassword(password, Teacher.password);
  if (isMatch) {
    res.json({
      status: "Success",
      data: generateToken(Teacher._id),
    });
  } else {
    res.json({
      message: "Invalid Login",
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
//Access Private
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
//Access Private
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
//Access Private
exports.updateTeacherCtrl = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const teacherExit = await Teacher.findOne({ email });
  if (teacherExit) {
    throw new Error("The email exit already");
  }
  const updatedTeacher = await Teacher.findByIdAndUpdate(
    req.useAuth,
    {
      name,
      email,
      password: hashPassword(password),
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
});
