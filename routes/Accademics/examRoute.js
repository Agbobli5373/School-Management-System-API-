const express = require("express");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");
const isTeacher = require("../../middlewares/isTeacher");
const {
  createExamCtrl,
  getExamCtrl,
  getExamsCtrl,
  updateExamCtrl,
  deleteExamCtrl,
} = require("../../controller/Academics/examCtrl");

const examRoute = express.Router();
//craeting of exam controller
examRoute.post('/',isTeacherLogin, isTeacher, createExamCtrl);
//fetching all exam route
examRoute.get("/", getExamsCtrl);
//Geting Single Exam
examRoute.get("/:examID" , getExamCtrl)
//upadating Exam 
examRoute.put("/:examID" ,isTeacherLogin, isTeacher, updateExamCtrl )
//upadating Exam 
examRoute.delete("/:examID" ,isTeacherLogin, isTeacher, deleteExamCtrl )



module.exports = examRoute;