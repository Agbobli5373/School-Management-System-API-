const express = require("express") ;
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");

const {adminRegisterTeacher,teacherLoginCtrl} = require("../../controller/Staff/teacherCtrl");

const teacherRoute = express.Router();

//Admin register Teacher
teacherRoute.post("/admin/register",isLogin,isAdmin ,adminRegisterTeacher);
//Teacher login
teacherRoute.post("/login",teacherLoginCtrl);

module.exports = teacherRoute ;