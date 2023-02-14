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
    data: createdTeacher
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


