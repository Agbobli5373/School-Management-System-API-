const express = require("express");
const isLogin = require("../../middlewares/isLogin") ;
const isAdmin = require("../../middlewares/isAdmin") ;
const adminRouter = express.Router();

const {registerAdminCtrl,loginAdminCtrl,getAdmins, 
       getAdminProfile, updateAdmin, deleteAdmin, 
       suspendTeacher, unsuspendTeacher, withdrawTeacher,
       unwithdrawTeacher, publisheExam, unpublishExam } = require('../../controller/Staff/adminCtrl')



//register
adminRouter.post("/register", registerAdminCtrl);

//sign in
adminRouter.post("/login", loginAdminCtrl);

//get all admins
adminRouter.get("",isLogin,getAdmins );

//get single admin
adminRouter.get("/profile", isLogin, isAdmin, getAdminProfile);

//update admin
adminRouter.put("/", isLogin, isAdmin, updateAdmin);

//delete admin
adminRouter.delete("/:adminID",deleteAdmin );

//admin suspending teacher
adminRouter.put("/suspend/teacher/:Id",suspendTeacher);

//admin unsuspending teacher
adminRouter.put("/unsuspend/teacher/:Id",unsuspendTeacher);

//admin witdrawing teacher
adminRouter.put("/withdraw/teacher/:Id", withdrawTeacher);

//admin unwitdrawing teacher
adminRouter.put("/unwithdraw/teacher/:Id", unwithdrawTeacher);

//admin publish result
adminRouter.put("/publish/exam/:Id", publisheExam);

//admin unpublish result
adminRouter.put("/unpublish/exam/:Id",unpublishExam);

module.exports = adminRouter;
