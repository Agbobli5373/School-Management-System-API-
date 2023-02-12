const express = require("express");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");
const {
  createClassLevelCtrl,
  getClassLevelCtrl,
  getClassLevelsCtrl,
  updateClassLevelCtrl,
  deleteClassLevelCtrl,
} = require("../../controller/Academics/classLevelCtrl");

const ClassLevelRouter = express.Router();

ClassLevelRouter.route("/")
   // create class level route
  .post(isLogin, isAdmin, createClassLevelCtrl)
  // get all class level route
  .get(isLogin, isAdmin, getClassLevelsCtrl);

ClassLevelRouter.route("/:id")
   //get single class level by id route
  .get(isLogin, isAdmin, getClassLevelCtrl)
   //update class level by id route
  .put(isLogin, isAdmin, updateClassLevelCtrl)
  //delete class level by id route
  .delete(isLogin, isAdmin, deleteClassLevelCtrl);

module.exports = ClassLevelRouter