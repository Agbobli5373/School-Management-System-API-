const express = require("express");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");
const isTeacher = require("../../middlewares/isTeacher");

const {
  adminRegisterTeacher,
  adminGetTeacherCtrl,
  adminGetTeachersCtrl,
  teacherLoginCtrl,
  getTeacherProfile,
  updateTeacherCtrl,
  adminUpdateTeacherCtrl
} = require("../../controller/Staff/teacherCtrl");

const teacherRoute = express.Router();

//Admin register Teacher
teacherRoute.post("/admin/register", isLogin, isAdmin, adminRegisterTeacher);
//Admin get single Teacher by id
teacherRoute.get("/admin/:teacherID", isLogin, isAdmin, adminGetTeacherCtrl);
//admin get all teachers
teacherRoute.get("/admin", isLogin, isAdmin, adminGetTeachersCtrl);
//Admin asigning role to teacher
teacherRoute.put("/admin/:teacherID/update",isLogin,isAdmin,adminUpdateTeacherCtrl);

//Teacher login
teacherRoute.post("/login", teacherLoginCtrl);
//Teacher Profile
teacherRoute.get("/profile", isTeacherLogin, isTeacher, getTeacherProfile);
//Teacher update
teacherRoute.put("/", isTeacherLogin, isTeacher, updateTeacherCtrl);


module.exports = teacherRoute;
