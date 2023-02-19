const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const adminRouter = require("../routes/Staff/adminiRoute");
const academicYrRouter = require("../routes/Accademics/academicYearRoute");
const academicTermRouter = require("../routes/Accademics/acadmicTermRoute");
const classLevelRouter = require("../routes/Accademics/classLevelRoute");
const programRouter = require("../routes/Accademics/programRoute");
const subjectRouter = require("../routes/Accademics/subjectRoute");
const yearGroupRouter = require("../routes/Accademics/yearGroupRoute");
const teacherRoute = require("../routes/Staff/teacherRoute");
const examRoute = require("../routes/Accademics/examRoute");
const studentRouter = require("../routes/Accademics/studentRoute");
const { errorHandler, notFound } = require("../middlewares/globalErrorHandler");

const app = express();

//middleware
app.use(morgan("dev"));

//body-parser middlerware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use(express.json()) // pass json data

// Admin routes
app.use("/api/v1/admins/", adminRouter);
//Accademic Year route
app.use("/api/v1/academic-year/", academicYrRouter);
//Accademic Term route
app.use("/api/v1/academic-terms/", academicTermRouter);
//Accademic Term route
app.use("/api/v1/class-levels/", classLevelRouter);
//Program route
app.use("/api/v1/programs/", programRouter);
//Subject route
app.use("/api/v1/subjects/", subjectRouter) ;
//Year route
app.use("/api/v1/year-groups/", yearGroupRouter) ;
//Teacher route
app.use("/api/v1/teachers/", teacherRoute);
//Exam route
app.use("/api/v1/exams/", examRoute);
//Student route
app.use("/api/v1/students/", studentRouter);
//not found middleware
app.use(notFound);

//error middleware
app.use(errorHandler);

module.exports = app;
