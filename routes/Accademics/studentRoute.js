const express = require("express");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");
const isStudentLogin = require("../../middlewares/isStudentLogin");
const {
  registerStudentCtrl,
  studentLoginCtl,
  getStudentCtl,
  getStudentsCtl,
  studentProfileCtl,
} = require("../../controller/Academics/studentCtrl");

const studentRouter = express.Router();

//registeration of student
studentRouter.post("/admin/register", isLogin, isAdmin, registerStudentCtrl);
//student login
studentRouter.post("/login", studentLoginCtl);
//get single student
studentRouter.get("/:studentID", isLogin, isAdmin, getStudentCtl);
//get all student
studentRouter.get("/:studentID", isLogin, isAdmin, getStudentsCtl);

//get student profile
studentRouter.get("/profile", isStudentLogin, studentProfileCtl);


module.exports = studentRouter ;