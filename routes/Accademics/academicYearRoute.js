const express = require("express");
const academicYrRouter = express.Router();
const isLogin = require('../../middlewares/isLogin');
const isAdmin = require('../../middlewares/isAdmin')
const {
  createAcademicYrCtrl,
  getAcademicYrCtrl,
  getAcademicYrsCtrl,
  updateAcademicYrCtrl,
  deleteAcademicYrCtrl,
} = require("../../controller/Academics/academicYearCtrl");
/*
//Create Academic year route
academicYrRouter.post("/",isLogin, isAdmin, createAcademicYrCtrl);
//Get all Academic year route
academicYrRouter.get("/",isLogin, getAcademicYrsCtrl);
//Get single Academic year route
academicYrRouter.get("/:id",isLogin, getAcademicYrCtrl);
//Update Academic year route
academicYrRouter.put("/:id",isLogin, isAdmin, updateAcademicYrCtrl);
//Delete Academic year route
academicYrRouter.delete("/:id",isLogin, isAdmin, deleteAcademicYrCtrl); */

academicYrRouter.route('/')
                .post(isLogin, isAdmin, createAcademicYrCtrl)
                .get(isLogin, getAcademicYrsCtrl) ;
                
academicYrRouter.route('/:id')
                .get(isLogin, getAcademicYrCtrl)
                .put(isLogin, isAdmin, updateAcademicYrCtrl)
                .delete(isLogin, isAdmin, deleteAcademicYrCtrl) ;

module.exports = academicYrRouter;
