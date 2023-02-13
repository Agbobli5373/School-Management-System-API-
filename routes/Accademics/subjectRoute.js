const express = require("express");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");
const {
  createSubjectCtrl,
  getSubjectsCtrl,
  getSubjectCtrl,
  updateSubjectCtrl,
  deleteSubjectCtrl,
} = require("../../controller/Academics/SubjectCtrl");

const subjectRouter = express.Router();

subjectRouter
  .route("/:programID")
  .post(isLogin, isAdmin, createSubjectCtrl) ;

subjectRouter
  .route("/")
  .get(isLogin, isAdmin, getSubjectsCtrl);

subjectRouter.route("/:id")
  .get(isLogin, isAdmin, getSubjectCtrl)
  .delete(isLogin, isAdmin, deleteSubjectCtrl)
  .put(isLogin, isAdmin, updateSubjectCtrl);

module.exports = subjectRouter;
