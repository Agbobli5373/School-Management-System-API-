const express = require("express");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");
const {registerStudentCtrl , studentLoginCtl} = require("../../controller/Academics/studentCtrl");

const studentRoute = express.Router();

//registeration of student
studentRoute.post("/admin/register", isLogin , isAdmin , registerStudentCtrl);
//student login
studentRoute.post("/login" , studentLoginCtl);
