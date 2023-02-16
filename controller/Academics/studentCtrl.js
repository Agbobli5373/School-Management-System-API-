const AsyncHandler = require("express-async-handller");
const Student = require("../../model/Academics/Student");
const Admin = require("../../model/Staff/Admin");
const { hashPassword } = require("../../utils/helper");

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
