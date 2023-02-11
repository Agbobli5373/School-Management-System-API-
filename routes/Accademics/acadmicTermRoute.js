const express = require("express");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");
const academicTermRouter = express.Router();
const {
  createAcademicTermCtrl,
  getAcademicTermCtrl,
  getAcademicTermsCtrl,
  updateAcademicTermCtrl,
  deleteAcademicTermCtrl,
} = require("../../controller/Academics/academicTermCtrl");

academicTermRouter
  .route("/")
  .post(isLogin, isAdmin, createAcademicTermCtrl)
  .get( isLogin, isAdmin, getAcademicTermsCtrl);

academicTermRouter
  .route("/:id")
  .get(isLogin, isAdmin, getAcademicTermCtrl)
  .put(isLogin, isAdmin, updateAcademicTermCtrl)
  .delete(isLogin, isAdmin, deleteAcademicTermCtrl);

  module.exports = academicTermRouter;
