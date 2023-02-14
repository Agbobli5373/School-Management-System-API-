const express = require("express") ;
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");

const {adminRegisterTeacher,adminGetTeacherCtrl,adminGetTeachersCtrl,teacherLoginCtrl} = require("../../controller/Staff/teacherCtrl");

const teacherRoute = express.Router();

//Admin register Teacher
teacherRoute.post("/admin/register",isLogin,isAdmin ,adminRegisterTeacher);
//Admin get single Teacher by id
teacherRoute.get("/admin/:teacherID",isLogin,isAdmin,adminGetTeacherCtrl);
//admin get all teachers
teacherRoute.get("/admin",isLogin,isAdmin, adminGetTeachersCtrl);

//Teacher login
teacherRoute.post("/login",teacherLoginCtrl);

module.exports = teacherRoute ;