const express = require("express");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");
const {
  registerStudentCtrl,
  studentLoginCtl,
  getStudentCtl,
  getStudentsCtl,
} = require("../../controller/Academics/studentCtrl");

const studentRoute = express.Router();

//registeration of student
studentRoute.post("/admin/register", isLogin, isAdmin, registerStudentCtrl);
//student login
studentRoute.post("/login", studentLoginCtl);
//get single student
studentRoute.get("/:studentID", isLogin, isAdmin, getStudentCtl);
//get all student
studentRoute.get("/:studentID", isLogin, isAdmin, getStudentsCtl);
