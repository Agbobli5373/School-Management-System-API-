const express = require("express");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");
const {
  createProgramCtrl,
  getProgramsCtrl,
  getProgramCtrl,
  updateProgramCtrl,
  deleteProgramCtrl
} = require("../../controller/Academics/programCtrl");

const programRouter = express.Router();

programRouter.route("/")
            .post(isLogin,isAdmin,createProgramCtrl)
            .get(isLogin,isAdmin,getProgramsCtrl);


            programRouter.route("/:id")
            .get(isLogin,isAdmin,getProgramCtrl)
            .delete(isLogin, isAdmin,deleteProgramCtrl)
            .put(isLogin, isAdmin,updateProgramCtrl);


module.exports = programRouter