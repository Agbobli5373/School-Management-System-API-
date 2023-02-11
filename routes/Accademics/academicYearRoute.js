const express = require("express");
const academicYrRouter = express.Router();
const {createAcademicYrCtrl ,
       getAcademicYrCtrl,
       getAcademicYrsCtrl,
       updateAcademicYrCtrl,
       deleteAcademicYrCtrl
       } = require("../../controller/Academics/academicYearCtrl")

//Create Academic year route
academicYrRouter.post("/",createAcademicYrCtrl) ;
//Get all Academic year route
academicYrRouter.get("/",getAcademicYrsCtrl) ;
//Get single Academic year route
academicYrRouter.get("/:id",getAcademicYrCtrl) ;
//Update Academic year route
academicYrRouter.put("/:id",updateAcademicYrCtrl) ;
//Delete Academic year route
academicYrRouter.delete("/:id",deleteAcademicYrCtrl) ;
module.exports = academicYrRouter;