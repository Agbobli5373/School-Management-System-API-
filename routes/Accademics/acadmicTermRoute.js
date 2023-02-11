const express = require("express");
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
  .post(createAcademicTermCtrl)
  .get(getAcademicTermsCtrl);

academicTermRouter
  .route("/:id")
  .get(getAcademicTermCtrl)
  .put(updateAcademicTermCtrl)
  .delete(deleteAcademicTermCtrl);

  module.exports = academicTermRouter;
