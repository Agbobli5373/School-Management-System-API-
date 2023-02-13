const express = require("express");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");
const {
  createYearGroupCtrl,
  getYearGroupsCtrl,
  getYearGroupCtrl,
  updateYearGroupCtrl,
  deleteYearGroupCtrl
} = require("../../controller/Academics/YearGroupCtrl");

const YearGroupRouter = express.Router();

YearGroupRouter.route("/")
            .post(isLogin,isAdmin,createYearGroupCtrl)
            .get(isLogin,isAdmin,getYearGroupsCtrl);


            YearGroupRouter.route("/:id")
            .get(isLogin,isAdmin,getYearGroupCtrl)
            .delete(isLogin, isAdmin,deleteYearGroupCtrl)
            .put(isLogin, isAdmin,updateYearGroupCtrl);


module.exports = YearGroupRouter